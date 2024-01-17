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
} from "../../../common";

export interface CXBTokenBountyInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "authority"
      | "balanceOf"
      | "clean"
      | "empty"
      | "give"
      | "isAgent"
      | "isConsumingScheduledOp"
      | "pause"
      | "paused"
      | "refuel"
      | "setAuthority"
      | "setVesting"
      | "unpause"
      | "vesting"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic: "AuthorityUpdated" | "Paused" | "Unpaused"
  ): EventFragment;

  encodeFunctionData(functionFragment: "authority", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "balanceOf",
    values: [AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "clean", values: [AddressLike]): string;
  encodeFunctionData(functionFragment: "empty", values: [AddressLike]): string;
  encodeFunctionData(
    functionFragment: "give",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "isAgent",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "isConsumingScheduledOp",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "pause", values?: undefined): string;
  encodeFunctionData(functionFragment: "paused", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "refuel",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setAuthority",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setVesting",
    values: [AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "unpause", values?: undefined): string;
  encodeFunctionData(functionFragment: "vesting", values?: undefined): string;

  decodeFunctionResult(functionFragment: "authority", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "clean", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "empty", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "give", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isAgent", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isConsumingScheduledOp",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "pause", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "paused", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "refuel", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setAuthority",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setVesting", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "unpause", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "vesting", data: BytesLike): Result;
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

export interface CXBTokenBounty extends BaseContract {
  connect(runner?: ContractRunner | null): CXBTokenBounty;
  waitForDeployment(): Promise<this>;

  interface: CXBTokenBountyInterface;

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

  authority: TypedContractMethod<[], [string], "view">;

  balanceOf: TypedContractMethod<[target: AddressLike], [bigint], "view">;

  clean: TypedContractMethod<[_to: AddressLike], [void], "nonpayable">;

  empty: TypedContractMethod<[target: AddressLike], [void], "nonpayable">;

  give: TypedContractMethod<
    [target: AddressLike, amount: BigNumberish],
    [void],
    "nonpayable"
  >;

  isAgent: TypedContractMethod<[target: AddressLike], [boolean], "view">;

  isConsumingScheduledOp: TypedContractMethod<[], [string], "view">;

  pause: TypedContractMethod<[], [void], "nonpayable">;

  paused: TypedContractMethod<[], [boolean], "view">;

  refuel: TypedContractMethod<
    [agent: AddressLike, addAmount: BigNumberish],
    [void],
    "nonpayable"
  >;

  setAuthority: TypedContractMethod<
    [newAuthority: AddressLike],
    [void],
    "nonpayable"
  >;

  setVesting: TypedContractMethod<
    [_vesting: AddressLike],
    [void],
    "nonpayable"
  >;

  unpause: TypedContractMethod<[], [void], "nonpayable">;

  vesting: TypedContractMethod<[], [string], "view">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "authority"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "balanceOf"
  ): TypedContractMethod<[target: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "clean"
  ): TypedContractMethod<[_to: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "empty"
  ): TypedContractMethod<[target: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "give"
  ): TypedContractMethod<
    [target: AddressLike, amount: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "isAgent"
  ): TypedContractMethod<[target: AddressLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "isConsumingScheduledOp"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "pause"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "paused"
  ): TypedContractMethod<[], [boolean], "view">;
  getFunction(
    nameOrSignature: "refuel"
  ): TypedContractMethod<
    [agent: AddressLike, addAmount: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "setAuthority"
  ): TypedContractMethod<[newAuthority: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "setVesting"
  ): TypedContractMethod<[_vesting: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "unpause"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "vesting"
  ): TypedContractMethod<[], [string], "view">;

  getEvent(
    key: "AuthorityUpdated"
  ): TypedContractEvent<
    AuthorityUpdatedEvent.InputTuple,
    AuthorityUpdatedEvent.OutputTuple,
    AuthorityUpdatedEvent.OutputObject
  >;
  getEvent(
    key: "Paused"
  ): TypedContractEvent<
    PausedEvent.InputTuple,
    PausedEvent.OutputTuple,
    PausedEvent.OutputObject
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
