// Copyright Abridged, Inc. 2022. All Rights Reserved.
// Node module: @collabland/staking-contracts
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {Provider} from '@ethersproject/abstract-provider';
import {BindingScope, extensionFor, injectable} from '@loopback/core';
import {BigNumber} from 'ethers';
import {STAKING_ADAPTERS_EXTENSION_POINT} from '../keys';
import {BaseStakingContractAdapter} from '../staking';
import {RirsuStaking__factory} from '../types/factories/RirsuStaking__factory';

@injectable(
  {
    scope: BindingScope.SINGLETON,
  },
  extensionFor(STAKING_ADAPTERS_EXTENSION_POINT),
)
export class RirsuStakingContractAdapter extends BaseStakingContractAdapter {
  contractAddress = '0x2fBe96A414add128DB33C90a81Ed781f4dF14885';

  getStakedTokenIds(
    provider: Provider,
    owner: string,
    assetType = 'riris',
  ): Promise<BigNumber[]> {
    const contract = RirsuStaking__factory.connect(
      this.contractAddress,
      provider,
    );
    if (assetType === 'sanctums') {
      return contract.stakedSanctums(owner);
    }
    return contract.stakedRiris(owner);
  }
}