//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;
import "@bgrusnak/solidity-icoset/contracts/management/Airdrop.sol";
import "@bgrusnak/solidity-icoset/contracts/management/IVesting.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract CXBTokenAirdrop is AccessManaged, ReentrancyGuard, Pausable {
    /**
     * @dev Indicates an error related to the already redeemed amount. Used in redeem.
     * @param target Address who calls redeem..
     */
    error CXBTokenAirdropAlreadyRedeemed(address target);

    /**
     * @dev Indicates an error related to the wrong tree validation. Used in redeem.
     * @param target Address who calls redeem.
     * @param amount Amount redeemed.
     * @param proof The proof provided.
     */
    error CXBTokenAirdropWrongPath(
        address target,
        uint256 amount,
        bytes32[] proof
    );

    /**
     * @dev Indicates an error when empty token is provided.
     */
    error CXBTokenAirdropEmptyToken();

    event Redeem(address indexed account, uint256 amount);
    event Vesting(address indexed account, uint256 amount);

    bytes32 public root;
    IERC20 private token;
    IVesting private vesting;
    uint256 public redeemAmount;
    mapping(address => bool) private redeemed;

    constructor(
        IERC20 _token,
        IVesting _vesting,
        address initialAuthority,
        uint256 _amount,
        bytes32 _root
    ) AccessManaged(initialAuthority) {
        if (address(_token) == address(0)) {
            revert CXBTokenAirdropEmptyToken();
        }
        root = _root;
        token = _token;
        vesting = _vesting;
        redeemAmount = _amount;
    }

    /// @notice Addresses can redeem their tokens.
    /// @param proof Proof path.
    function redeem(bytes32[] memory proof) public nonReentrant whenNotPaused {
        if (redeemed[msg.sender]) {
            revert CXBTokenAirdropAlreadyRedeemed(msg.sender);
        }
        bytes32 leaf = keccak256(
            bytes.concat(keccak256(abi.encode(msg.sender, redeemAmount)))
        );
        if (!MerkleProof.verify(proof, root, leaf)) {
            revert CXBTokenAirdropWrongPath(msg.sender, redeemAmount, proof);
        }
        redeemed[msg.sender] = true;
        if (address(vesting) == address(0)) {
            token.transfer(msg.sender, redeemAmount);
            emit Redeem(msg.sender, redeemAmount);
            return;
        }
        token.transfer(address(vesting), redeemAmount);
        vesting.distribute(msg.sender, redeemAmount);
        emit Vesting(msg.sender, redeemAmount);
    }

    /// @notice Update merkle root
    /// @param _root Merkle root of the addresses white list.
    function updateMerkleRoot(bytes32 _root) public restricted whenPaused{
        root = _root;
    }

    /// @notice Update token address
    /// @param _token New token address.
    function updateToken(IERC20 _token) public restricted whenPaused{
        if (address(_token) == address(0)) {
            revert CXBTokenAirdropEmptyToken();
        }
        token = _token;
    }

    /// @notice Update vesting address
    /// @param _vesting New vesting address.
    function updateVesting(IVesting _vesting) public restricted whenPaused{
        vesting = _vesting;
    }

    /// @notice Update redeem amount
    /// @param _amount The redeemed amount.
    function updateRedeemAmount(uint256 _amount) public restricted whenPaused{
        redeemAmount = _amount;
    }

    /// @notice It cancels the Air Drop availability and sends the tokens to the manager provided address.
    /// @param _to The receiving address.
    /// @dev Only manager can perform this transaction. It selfdestructs the contract.
    function cancelAirDrop(address payable _to) public restricted whenPaused {
        uint256 contractBalance = token.balanceOf(address(this));
        token.transfer(_to, contractBalance); 
    }
}
