/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../../common";

export interface CXBTokenVestingInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "addKPI"
      | "amountsDistributed"
      | "amountsRedeemed"
      | "authority"
      | "distribute"
      | "increaseKPI"
      | "isConsumingScheduledOp"
      | "kpiCodes"
      | "modifyKPI"
      | "paused"
      | "redeem"
      | "removeKPI"
      | "setAuthority"
      | "updateAirdrop"
      | "updateKPI"
      | "updateToken"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "AuthorityUpdated"
      | "Distribute"
      | "KPIAdded"
      | "KPIModified"
      | "KPIRemoved"
      | "KPIUpdated"
      | "Paused"
      | "Redeem"
      | "Unpaused"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "addKPI",
    values: [BytesLike, BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "amountsDistributed",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "amountsRedeemed",
    values: [AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "authority", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "distribute",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "increaseKPI",
    values: [BytesLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "isConsumingScheduledOp",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "kpiCodes", values: [BytesLike]): string;
  encodeFunctionData(
    functionFragment: "modifyKPI",
    values: [BytesLike, BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "paused", values?: undefined): string;
  encodeFunctionData(functionFragment: "redeem", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "removeKPI",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setAuthority",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "updateAirdrop",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "updateKPI",
    values: [BytesLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "updateToken",
    values: [AddressLike]
  ): string;

  decodeFunctionResult(functionFragment: "addKPI", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "amountsDistributed",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "amountsRedeemed",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "authority", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "distribute", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "increaseKPI",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isConsumingScheduledOp",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "kpiCodes", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "modifyKPI", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "paused", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "redeem", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "removeKPI", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setAuthority",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateAirdrop",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "updateKPI", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "updateToken",
    data: BytesLike
  ): Result;
}

export namespace AuthorityUpdatedEvent {
  export type InputTuple = [authority: AddressLike];
  export type OutputTuple = [authority: string];
  export interface OutputObject {
    authority: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace DistributeEvent {
  export type InputTuple = [account: AddressLike, amount: BigNumberish];
  export type OutputTuple = [account: string, amount: bigint];
  export interface OutputObject {
    account: string;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace KPIAddedEvent {
  export type InputTuple = [
    code: BytesLike,
    time: BigNumberish,
    timeStatus: BigNumberish,
    weight: BigNumberish
  ];
  export type OutputTuple = [
    code: string,
    time: bigint,
    timeStatus: bigint,
    weight: bigint
  ];
  export interface OutputObject {
    code: string;
    time: bigint;
    timeStatus: bigint;
    weight: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace KPIModifiedEvent {
  export type InputTuple = [
    code: BytesLike,
    time: BigNumberish,
    timeStatus: BigNumberish,
    weight: BigNumberish
  ];
  export type OutputTuple = [
    code: string,
    time: bigint,
    timeStatus: bigint,
    weight: bigint
  ];
  export interface OutputObject {
    code: string;
    time: bigint;
    timeStatus: bigint;
    weight: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace KPIRemovedEvent {
  export type InputTuple = [code: BytesLike];
  export type OutputTuple = [code: string];
  export interface OutputObject {
    code: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace KPIUpdatedEvent {
  export type InputTuple = [code: BytesLike, amount: BigNumberish];
  export type OutputTuple = [code: string, amount: bigint];
  export interface OutputObject {
    code: string;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace PausedEvent {
  export type InputTuple = [account: AddressLike];
  export type OutputTuple = [account: string];
  export interface OutputObject {
    account: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RedeemEvent {
  export type InputTuple = [account: AddressLike, amount: BigNumberish];
  export type OutputTuple = [account: string, amount: bigint];
  export interface OutputObject {
    account: string;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace UnpausedEvent {
  export type InputTuple = [account: AddressLike];
  export type OutputTuple = [account: string];
  export interface OutputObject {
    account: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface CXBTokenVesting extends BaseContract {
  connect(runner?: ContractRunner | null): CXBTokenVesting;
  waitForDeployment(): Promise<this>;

  interface: CXBTokenVestingInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  addKPI: TypedContractMethod<
    [
      _code: BytesLike,
      _time: BigNumberish,
      _timeStatus: BigNumberish,
      _weight: BigNumberish
    ],
    [void],
    "nonpayable"
  >;

  amountsDistributed: TypedContractMethod<
    [arg0: AddressLike],
    [bigint],
    "view"
  >;

  amountsRedeemed: TypedContractMethod<[arg0: AddressLike], [bigint], "view">;

  authority: TypedContractMethod<[], [string], "view">;

  distribute: TypedContractMethod<
    [_to: AddressLike, _amount: BigNumberish],
    [void],
    "nonpayable"
  >;

  increaseKPI: TypedContractMethod<
    [_code: BytesLike, _amount: BigNumberish],
    [void],
    "nonpayable"
  >;

  isConsumingScheduledOp: TypedContractMethod<[], [string], "view">;

  kpiCodes: TypedContractMethod<[arg0: BytesLike], [bigint], "view">;

  modifyKPI: TypedContractMethod<
    [
      _code: BytesLike,
      _time: BigNumberish,
      _timeStatus: BigNumberish,
      _weight: BigNumberish
    ],
    [void],
    "nonpayable"
  >;

  paused: TypedContractMethod<[], [boolean], "view">;

  redeem: TypedContractMethod<[], [bigint], "nonpayable">;

  removeKPI: TypedContractMethod<[_code: BytesLike], [void], "nonpayable">;

  setAuthority: TypedContractMethod<
    [newAuthority: AddressLike],
    [void],
    "nonpayable"
  >;

  updateAirdrop: TypedContractMethod<
    [_airdrop: AddressLike],
    [void],
    "nonpayable"
  >;

  updateKPI: TypedContractMethod<
    [_code: BytesLike, _amount: BigNumberish],
    [void],
    "nonpayable"
  >;

  updateToken: TypedContractMethod<[_token: AddressLike], [void], "nonpayable">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "addKPI"
  ): TypedContractMethod<
    [
      _code: BytesLike,
      _time: BigNumberish,
      _timeStatus: BigNumberish,
      _weight: BigNumberish
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "amountsDistributed"
  ): TypedContractMethod<[arg0: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "amountsRedeemed"
  ): TypedContractMethod<[arg0: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "authority"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "distribute"
  ): TypedContractMethod<
    [_to: AddressLike, _amount: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "increaseKPI"
  ): TypedContractMethod<
    [_code: BytesLike, _amount: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "isConsumingScheduledOp"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "kpiCodes"
  ): TypedContractMethod<[arg0: BytesLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "modifyKPI"
  ): TypedContractMethod<
    [
      _code: BytesLike,
      _time: BigNumberish,
      _timeStatus: BigNumberish,
      _weight: BigNumberish
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "paused"
  ): TypedContractMethod<[], [boolean], "view">;
  getFunction(
    nameOrSignature: "redeem"
  ): TypedContractMethod<[], [bigint], "nonpayable">;
  getFunction(
    nameOrSignature: "removeKPI"
  ): TypedContractMethod<[_code: BytesLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "setAuthority"
  ): TypedContractMethod<[newAuthority: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "updateAirdrop"
  ): TypedContractMethod<[_airdrop: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "updateKPI"
  ): TypedContractMethod<
    [_code: BytesLike, _amount: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "updateToken"
  ): TypedContractMethod<[_token: AddressLike], [void], "nonpayable">;

  getEvent(
    key: "AuthorityUpdated"
  ): TypedContractEvent<
    AuthorityUpdatedEvent.InputTuple,
    AuthorityUpdatedEvent.OutputTuple,
    AuthorityUpdatedEvent.OutputObject
  >;
  getEvent(
    key: "Distribute"
  ): TypedContractEvent<
    DistributeEvent.InputTuple,
    DistributeEvent.OutputTuple,
    DistributeEvent.OutputObject
  >;
  getEvent(
    key: "KPIAdded"
  ): TypedContractEvent<
    KPIAddedEvent.InputTuple,
    KPIAddedEvent.OutputTuple,
    KPIAddedEvent.OutputObject
  >;
  getEvent(
    key: "KPIModified"
  ): TypedContractEvent<
    KPIModifiedEvent.InputTuple,
    KPIModifiedEvent.OutputTuple,
    KPIModifiedEvent.OutputObject
  >;
  getEvent(
    key: "KPIRemoved"
  ): TypedContractEvent<
    KPIRemovedEvent.InputTuple,
    KPIRemovedEvent.OutputTuple,
    KPIRemovedEvent.OutputObject
  >;
  getEvent(
    key: "KPIUpdated"
  ): TypedContractEvent<
    KPIUpdatedEvent.InputTuple,
    KPIUpdatedEvent.OutputTuple,
    KPIUpdatedEvent.OutputObject
  >;
  getEvent(
    key: "Paused"
  ): TypedContractEvent<
    PausedEvent.InputTuple,
    PausedEvent.OutputTuple,
    PausedEvent.OutputObject
  >;
  getEvent(
    key: "Redeem"
  ): TypedContractEvent<
    RedeemEvent.InputTuple,
    RedeemEvent.OutputTuple,
    RedeemEvent.OutputObject
  >;
  getEvent(
    key: "Unpaused"
  ): TypedContractEvent<
    UnpausedEvent.InputTuple,
    UnpausedEvent.OutputTuple,
    UnpausedEvent.OutputObject
  >;

  filters: {
    "AuthorityUpdated(address)": TypedContractEvent<
      AuthorityUpdatedEvent.InputTuple,
      AuthorityUpdatedEvent.OutputTuple,
      AuthorityUpdatedEvent.OutputObject
    >;
    AuthorityUpdated: TypedContractEvent<
      AuthorityUpdatedEvent.InputTuple,
      AuthorityUpdatedEvent.OutputTuple,
      AuthorityUpdatedEvent.OutputObject
    >;

    "Distribute(address,uint256)": TypedContractEvent<
      DistributeEvent.InputTuple,
      DistributeEvent.OutputTuple,
      DistributeEvent.OutputObject
    >;
    Distribute: TypedContractEvent<
      DistributeEvent.InputTuple,
      DistributeEvent.OutputTuple,
      DistributeEvent.OutputObject
    >;

    "KPIAdded(bytes32,uint256,uint8,uint16)": TypedContractEvent<
      KPIAddedEvent.InputTuple,
      KPIAddedEvent.OutputTuple,
      KPIAddedEvent.OutputObject
    >;
    KPIAdded: TypedContractEvent<
      KPIAddedEvent.InputTuple,
      KPIAddedEvent.OutputTuple,
      KPIAddedEvent.OutputObject
    >;

    "KPIModified(bytes32,uint256,uint8,uint16)": TypedContractEvent<
      KPIModifiedEvent.InputTuple,
      KPIModifiedEvent.OutputTuple,
      KPIModifiedEvent.OutputObject
    >;
    KPIModified: TypedContractEvent<
      KPIModifiedEvent.InputTuple,
      KPIModifiedEvent.OutputTuple,
      KPIModifiedEvent.OutputObject
    >;

    "KPIRemoved(bytes32)": TypedContractEvent<
      KPIRemovedEvent.InputTuple,
      KPIRemovedEvent.OutputTuple,
      KPIRemovedEvent.OutputObject
    >;
    KPIRemoved: TypedContractEvent<
      KPIRemovedEvent.InputTuple,
      KPIRemovedEvent.OutputTuple,
      KPIRemovedEvent.OutputObject
    >;

    "KPIUpdated(bytes32,uint16)": TypedContractEvent<
      KPIUpdatedEvent.InputTuple,
      KPIUpdatedEvent.OutputTuple,
      KPIUpdatedEvent.OutputObject
    >;
    KPIUpdated: TypedContractEvent<
      KPIUpdatedEvent.InputTuple,
      KPIUpdatedEvent.OutputTuple,
      KPIUpdatedEvent.OutputObject
    >;

    "Paused(address)": TypedContractEvent<
      PausedEvent.InputTuple,
      PausedEvent.OutputTuple,
      PausedEvent.OutputObject
    >;
    Paused: TypedContractEvent<
      PausedEvent.InputTuple,
      PausedEvent.OutputTuple,
      PausedEvent.OutputObject
    >;

    "Redeem(address,uint256)": TypedContractEvent<
      RedeemEvent.InputTuple,
      RedeemEvent.OutputTuple,
      RedeemEvent.OutputObject
    >;
    Redeem: TypedContractEvent<
      RedeemEvent.InputTuple,
      RedeemEvent.OutputTuple,
      RedeemEvent.OutputObject
    >;

    "Unpaused(address)": TypedContractEvent<
      UnpausedEvent.InputTuple,
      UnpausedEvent.OutputTuple,
      UnpausedEvent.OutputObject
    >;
    Unpaused: TypedContractEvent<
      UnpausedEvent.InputTuple,
      UnpausedEvent.OutputTuple,
      UnpausedEvent.OutputObject
    >;
  };
}
