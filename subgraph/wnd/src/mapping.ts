import { BigInt } from "@graphprotocol/graph-ts"
import {
  WnD,
  Approval,
  ApprovalForAll,
  DragonBurned,
  DragonMinted,
  DragonStolen,
  OwnershipTransferred,
  Paused,
  Transfer,
  Unpaused,
  WizardBurned,
  WizardMinted,
  WizardStolen
} from "../generated/WnD/WnD"
import { StatsEntity } from "../generated/schema"

export function handleApproval(event: Approval): void {}

export function handleApprovalForAll(event: ApprovalForAll): void {}

export function handleDragonBurned(event: DragonBurned): void {
    // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = StatsEntity.load(event.params.tokenId.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new StatsEntity(event.params.tokenId.toHex())

    // Entity fields can be set using simple assignments
    entity.dragonBurned = BigInt.fromI32(0)
  }

  entity.dragonBurned = entity.dragonBurned + BigInt.fromI32(1)
  // Entities can be written to the store with `.save()`
  entity.save()
}

export function handleDragonMinted(event: DragonMinted): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = StatsEntity.load(event.params.tokenId.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new StatsEntity(event.params.tokenId.toHex())

    // Entity fields can be set using simple assignments
    entity.dragonMinted = BigInt.fromI32(0)
  }

  entity.dragonMinted = entity.dragonMinted + BigInt.fromI32(1)
  // Entities can be written to the store with `.save()`
  entity.save()
}

export function handleDragonStolen(event: DragonStolen): void {
   // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = StatsEntity.load(event.params.tokenId.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new StatsEntity(event.params.tokenId.toHex())

    // Entity fields can be set using simple assignments
    entity.dragonStolen = BigInt.fromI32(0)
  }

  entity.dragonStolen = entity.dragonStolen + BigInt.fromI32(1)
  // Entities can be written to the store with `.save()`
  entity.save()
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handlePaused(event: Paused): void {}

export function handleTransfer(event: Transfer): void {}

export function handleUnpaused(event: Unpaused): void {}

export function handleWizardBurned(event: WizardBurned): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = StatsEntity.load(event.params.tokenId.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new StatsEntity(event.params.tokenId.toHex())

    // Entity fields can be set using simple assignments
    entity.wizardBurned = BigInt.fromI32(0)
  }

  entity.wizardBurned = entity.wizardBurned + BigInt.fromI32(1)
  // Entities can be written to the store with `.save()`
  entity.save()
}

export function handleWizardMinted(event: WizardMinted): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = StatsEntity.load(event.params.tokenId.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new StatsEntity(event.params.tokenId.toHex())

    // Entity fields can be set using simple assignments
    entity.wizardMinted = BigInt.fromI32(0)
  }

  entity.wizardMinted = entity.wizardMinted + BigInt.fromI32(1)
  // Entities can be written to the store with `.save()`
  entity.save()
}

export function handleWizardStolen(event: WizardStolen): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = StatsEntity.load(event.params.tokenId.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new StatsEntity(event.params.tokenId.toHex())

    // Entity fields can be set using simple assignments
    entity.wizardStolen = BigInt.fromI32(0)
  }

  entity.wizardStolen = entity.wizardStolen + BigInt.fromI32(1)
  // Entities can be written to the store with `.save()`
  entity.save()
}
