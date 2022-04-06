import { BigInt } from "@graphprotocol/graph-ts"
import {
  Tower,
  DragonClaimed,
  OwnershipTransferred,
  Paused,
  TokenStaked,
  Unpaused,
  WizardClaimed
} from "../generated/Tower/Tower"
import { StatsEntity } from "../generated/schema"

export function handleDragonClaimed(event: DragonClaimed): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handlePaused(event: Paused): void {}

export function handleTokenStaked(event: TokenStaked): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = StatsEntity.load(event.params.tokenId.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new StatsEntity(event.params.tokenId.toHex())

    // Entity fields can be set using simple assignments
    entity.dragonStaked = BigInt.fromI32(0)
    entity.wizardStaked = BigInt.fromI32(0)
  }

  if (event.params.isWizard) {
    // BigInt and BigDecimal math are supported
    entity.wizardStaked = entity.wizardStaked + BigInt.fromI32(1)
  } else {
    entity.dragonStaked = entity.dragonStaked + BigInt.fromI32(1)
  }
  
  // Entities can be written to the store with `.save()`
  entity.save()
}

export function handleUnpaused(event: Unpaused): void {}

export function handleWizardClaimed(event: WizardClaimed): void {}
