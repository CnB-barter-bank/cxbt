//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;
import '@bgrusnak/solidity-icoset/contracts/management/TransferableAccessManager.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/access/manager/IAccessManaged.sol';

/**
 * @title PresaleManager
 * @author Ilya A. Shlyakhovoy
 * @notice The simple Manager contract for presale phase during the
 * mature Manager contract in development
 * Only confirms execution of token functions if owner called it
 */

contract PresaleManager is TransferableAccessManager { 
  error NotAnAdmin();

  modifier onlyAdmin() {
    (bool isAdmin, ) = hasRole(ADMIN_ROLE, msg.sender);
    if (!isAdmin) revert NotAnAdmin();
    _;
  }

  constructor(
    address initialOwner,
    address[] memory _workers
  ) TransferableAccessManager(initialOwner, _workers) {}

  function addWorker(
    address _worker
  ) external virtual override onlyAdmin returns (bool) {
    return _addWorker(_worker);
  }

  function removeAt(uint256 i) external virtual override onlyAdmin {
    _removeAt(i);
  }

  function remove(address _worker) external virtual override onlyAdmin {
    _remove(_worker);
  }

  function transferAuthority(
    address newAuthority
  ) external virtual override onlyAdmin { 
    if (newAuthority == address(0)) revert EmptyAuthority();
        uint256 len = this.total();
        address here = address(this);
        for (uint256 i = 0; i < len; i++) {
          if (IAccessManaged(this.at(i)).authority()==here)
            IAccessManaged(this.at(i)).setAuthority(newAuthority);
        }
  }
  
}
