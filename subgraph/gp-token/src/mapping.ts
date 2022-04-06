import { BigInt } from "@graphprotocol/graph-ts"
import {
  GP,
  Approval,
  OwnershipTransferred,
  Transfer
} from "../generated/GP/GP"
import { StatsEntity, LeaderEntity } from "../generated/schema"

export function handleApproval(event: Approval): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  let entity = LeaderEntity.load(event.params.newOwner.toHex())
  if (!entity) {
    entity = new LeaderEntity(event.params.newOwner.toHex())
    entity.minted = BigInt.fromI32(0)
  }
  entity.minted.plus(BigInt.fromI32(1));
}

export function handleTransfer(event: Transfer): void {
  let entity = LeaderEntity.load(event.params.from.toHex())
  if (!entity) {
    entity = new LeaderEntity(event.params.from.toHex())
    entity.minted = BigInt.fromI32(0)
  }
  entity.minted.plus(event.params.value);
}
