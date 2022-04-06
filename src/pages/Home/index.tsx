import { FC, useState, useEffect } from 'react';

import { message, notification, Spin, Typography } from 'antd';
import { useWallet } from '../../hooks/useWallet';
import styled from 'styled-components';
import background from '../../assets/images/background.png';
import StakingSection from './components/StakingSection';
import MiddleTextSection from './components/MiddleTextSection';
import MintingSection from './components/MintingSection';
import GameDataSection from './components/GameDataSection';
import SacrificeSection from './components/SacrificeSection';
import TreasureChest from './components/TreasureChest';

import {
  getContractTower,
  getContractWnD,
  getContractWnDGame,
  getContractGPToken,
  getContractAlter,
} from '../../utils/getContract';
import { TOWER_CONTRACT } from '../../utils/constants';
import WhatHappenModal from '../../components/WhatHappenModal/WhatHappenModal';
import { SyncOutlined } from '@ant-design/icons';
import data0to13732960 from '../../utils/0to13732960.json';
import data13723961to13737065 from '../../utils/13723961to13737065.json';
import axios from 'axios';

import confirmBg from '../../assets/images/modal-bg.png';

const loadingIcon = <SyncOutlined style={{ fontSize: 50 }} spin />;
const HomePage: FC = () => {
  const [open, setOpen] = useState(false);
  const toggleOpen: any = () => setOpen(!open);
  const [loading, setLoading] = useState('');
  const [whatHappen, setWhatHappen] = useState([] as any);
  const [confirming, setConfirming] = useState('');

  const [data, setData] = useState({
    minted: 15001,
    paidTokens: 0,
    maxTokens: 0,
    stats: {},
    numWizardsStolen: 0,
    numDragonsStolen: 0,
    numDragons: 0,
    numWizards: 0,
    totalGPEarned: 0,
    totalStakePercent: 0,
    mintCost: 0,
    balanceOfTokenUser: 0,
    tokenDragons: [] as any,
    tokenWizards: [] as any,
    depositWizards: [] as any,
    depositDragons: [] as any,
    DAILY_GP_RATE: 0,
    blockTimestamp: 0,
    MAXIMUM_GLOBAL_GP: 0,
    leaderboardData: [] as any,
    unclaimedGP: 0,
    numWizardsBurned: 0,
    numDragonsBurned: 0,
    isGamePaused: false,
    currentGPAmount: 0,
    hasMintPending: false,
    canMint: false,
    dragonsLeftToSacrifice: 0,
    wizardsLeftToSacrifice: 0,
    totalGPBurned: 0,
  });

  const { active, account, connector, library } = useWallet();
  function delay(time: number): Promise<void> {
    return new Promise<void>((resolve) => setTimeout(resolve, time * 1000));
  }

  async function tryNTimes(toTry: any, times = 10, interval = 5) {
    if (times < 1) throw new Error(`Bad argument: 'times' must be greater than 0, but ${times} was received.`);
    let attemptCount = 0;
    while (true) {
      try {
        const result = await toTry();
        setConfirming('');
        return result;
      } catch (error) {
        if (++attemptCount >= times) throw error;
      }
      await delay(interval);
    }
  }

  const handleError = (err: any) => {
    if (err?.message.includes('execution reverted')) {
      if (err?.message.includes('guarding')) {
        notification.error({
          message: '',
          description: 'Execution reverted: Wizard needs to be staked for 2 days',
        });

        return;
      }
      notification.error({
        message: '',
        description: err.message.substr(0, err.message.indexOf('{')) || err.message,
      });
    } else {
      notification.error({
        message: '',
        description: err.message,
      });
    }
  };

  const getBlockchainData = async (text?: string, isShowWhatHappen?: any, isFirstLoad?: boolean) => {
    if (connector && library) {
      try {
        isFirstLoad && setLoading('Fetching data...');
        const { contract: WndContract } = await getContractWnD(connector);
        const { contract: WndGameContract } = await getContractWnDGame(connector);
        const { contract: TowerContract } = await getContractTower(connector);
        const { contract: GPContract } = await getContractGPToken(connector);
        const { contract: AlterContact } = await getContractAlter(connector);
        // GET NUM DRAGON, WIZARD ======================================================================
        let numDragonsStolen = 0;
        let numWizardsStolen = 0;
        let numDragonsBurned = 0;
        let numWizardsBurned = 0;
        let numDragons = 0;
        let numWizards = 0;
        const minted = +(await WndContract.methods.totalSupply().call());
        const balanceOfStaking = +(await WndContract.methods.balanceOf(TOWER_CONTRACT).call());
        let stats = {
          numDragonsStaked: 0,
          numWizardsStaked: 0,
        };
        let totalGPBurned = 0;

        try {
          const TowerGraphData = await axios({
            url: 'https://api.thegraph.com/subgraphs/name/wndgame/tower',
            method: 'post',
            data: {
              query: `
                query {
                  statsEntities(first: 5) {
                    id
                    dragonStaked
                    wizardStaked
                  }
                }
                `,
            },
          });
          const WndGraphData = await axios({
            url: 'https://api.thegraph.com/subgraphs/name/wndgame/wnd',
            method: 'post',
            data: {
              query: `
                query{
                  statsEntities {
                    wizardMinted
                    wizardBurned
                    wizardStolen
                    dragonMinted
                    dragonBurned
                    dragonStolen
                  }
                }
                `,
            },
          });
          numDragonsStolen = WndGraphData?.data?.data?.statsEntities[0]?.dragonStolen;
          numDragonsBurned = WndGraphData?.data?.data?.statsEntities[0]?.dragonBurned;
          numDragons = WndGraphData?.data?.data?.statsEntities[0]?.dragonMinted;
          numWizardsStolen = WndGraphData?.data?.data?.statsEntities[0]?.wizardStolen;
          numWizardsBurned = WndGraphData?.data?.data?.statsEntities[0]?.wizardBurned;
          numWizards = minted - numDragons;
          stats = {
            numDragonsStaked: TowerGraphData?.data?.data?.statsEntities[0]?.dragonStaked,
            numWizardsStaked: balanceOfStaking - TowerGraphData?.data?.data?.statsEntities[0]?.dragonStaked,
          };
        } catch {
          const WizardStolenLogs = await WndContract.getPastEvents('WizardStolen', {
            fromBlock: 0,
            toBlock: 'latest',
          });
          const DragonStolenLogs = await WndContract.getPastEvents('DragonStolen', {
            fromBlock: 0,
            toBlock: 'latest',
          });
          const WizardBurnedLogs = await WndContract.getPastEvents('WizardBurned', {
            fromBlock: 0,
            toBlock: 'latest',
          });
          const DragonBurnedLogs = await WndContract.getPastEvents('DragonBurned', {
            fromBlock: 0,
            toBlock: 'latest',
          });

          // const WizardMintedLogs = await WndContract.getPastEvents('WizardMinted', {
          //   fromBlock: 0,
          //   toBlock: 'latest',
          // });
          const DragonMintedLogs = await WndContract.getPastEvents('DragonMinted', {
            fromBlock: 0,
            toBlock: 'latest',
          });

          const dragonIdArray = [];
          for (const log of DragonMintedLogs) {
            const { tokenId } = log.returnValues;
            dragonIdArray.push(tokenId.toString());
          }

          numDragonsStolen = DragonStolenLogs.length;
          numWizardsStolen = WizardStolenLogs.length;
          numDragonsBurned = DragonBurnedLogs.length;
          numWizardsBurned = WizardBurnedLogs.length;
          numDragons = DragonMintedLogs.length;
          numWizards = minted - numDragons;

          const TokenStakedLogs = await TowerContract.getPastEvents('TokenStaked', {
            filter: { tokenId: dragonIdArray },
            fromBlock: 0,
            toBlock: 'latest',
          }); //@ts-ignore
          const DragonClaimedLogs = await TowerContract.getPastEvents('DragonClaimed', {
            filter: { unstaked: true },
            fromBlock: 0,
            toBlock: 'latest',
          });

          const combineLogs = [...TokenStakedLogs, ...DragonClaimedLogs].sort(
            (a, b) => a.blockNumber - b.blockNumber || a.transactionIndex - b.transactionIndex
          );

          const combineDragonSet: any = new Set();

          for (const log of combineLogs) {
            const { tokenId, unstaked } = log.returnValues;
            combineDragonSet.add(tokenId.toString());
            if (unstaked) {
              combineDragonSet.delete(tokenId.toString());
            }
          }

          stats = {
            numDragonsStaked: combineDragonSet.size,
            numWizardsStaked: balanceOfStaking - combineDragonSet.size,
          };
        }
        // GET NUM DRAGON, WIZARD END ======================================================================

        // GET LEADERBOARD DATA ======================================================================
        let leaderboardData = [] as any;
        try {
          const GPGraphData = await axios({
            url: 'https://api.thegraph.com/subgraphs/name/wndgame/gp-token',
            method: 'post',
            data: {
              query: `
                query{
                  leaderEntities(first: 10 orderBy:minted orderDirection: desc ) {
                    id
                    minted
                  }
                  statsEntities {
                    burned
                  }
                }
                `,
            },
          });
          leaderboardData = GPGraphData?.data?.data?.leaderEntities?.map((item: any) => ({
            address: item.id,
            value: +library?.utils.fromWei('' + item.minted, 'ether'),
          }));
          totalGPBurned = +library?.utils.fromWei('' + GPGraphData?.data?.data?.statsEntities[0]?.burned, 'ether');
        } catch {
          try {
            const GPTransferLogs = await GPContract.getPastEvents('Transfer', {
              filter: { from: '0x0000000000000000000000000000000000000000' },
              fromBlock: 13737065,
              toBlock: 'latest',
            });

            const listData = GPTransferLogs.map((item: any) => {
              return {
                address: item?.returnValues?.to,
                value: +(library?.utils.fromWei(item?.returnValues?.value || '0', 'ether') || 0),
              };
            });

            const listDataAddJSON = [...data0to13732960, ...data13723961to13737065, ...listData];
            // const block = await library?.eth?.getBlockNumber();
            // console.log(data0to13732960.length,listDataAddJSON);
            // 13732960
            const leaderboard = Array.from(
              listDataAddJSON.reduce(
                (m, { address, value }) => m.set(address, (m.get(address) || 0) + value),
                new Map()
              ),
              ([address, value]) => ({ address, value })
            ).sort((prev: any, curr: any) => curr.value - prev.value);
            if (leaderboard.length > 10) {
              leaderboardData = leaderboard.slice(0, 10);
            } else {
              leaderboardData = leaderboard;
            }
          } catch {}
        }
        // GET LEADERBOARD DATA END ======================================================================

        const infoForDragon = await AlterContact.methods.getInfoForType(4).call();
        const infoForWizard = await AlterContact.methods.getInfoForType(3).call();
        const dragonsLeftToSacrifice = +infoForDragon.maxSupply - +infoForDragon.mints + +infoForDragon.burns;
        const wizardsLeftToSacrifice = +infoForWizard.maxSupply - +infoForWizard.mints + +infoForWizard.burns;

        const balanceOfOwner = +(await WndContract.methods.balanceOf(account).call());

        const maxTokens = +(await WndContract.methods.getMaxTokens().call());
        const paidTokens = +(await WndContract.methods.getPaidTokens().call());
        const isGamePaused = await WndGameContract.methods.paused().call();

        const hasMintPending = await WndGameContract.methods.hasMintPending(account).call();
        const canMint = await WndGameContract.methods.canMint(account).call();

        const totalGPEarned = await TowerContract.methods.totalGPEarned().call();

        const totalStakePercent = (balanceOfStaking / minted) * 100;
        const mintCost = await WndGameContract.methods.mintCost(minted, maxTokens).call();
        const balanceOfTokenUser = await GPContract.methods.balanceOf(account).call();

        var blockNumber = await library?.eth?.getBlockNumber();
        var block: any = await library?.eth?.getBlock(blockNumber || 0);
        const blockTimestamp = block.timestamp * 1000;
        const DAILY_GP_RATE = await TowerContract.methods.DAILY_GP_RATE().call();
        const DAILY_GP_RATE_CONVERT = +(library?.utils.fromWei(DAILY_GP_RATE || 0, 'ether') || 0);
        const MAXIMUM_GLOBAL_GP = await TowerContract.methods.MAXIMUM_GLOBAL_GP().call();
        const MAXIMUM_GLOBAL_GP_CONVERT = +(library?.utils.fromWei(MAXIMUM_GLOBAL_GP || 0, 'ether') || 0);
        const MINIMUM_TO_EXIT = +(await TowerContract.methods.MINIMUM_TO_EXIT().call());

        let tokensOfOwner = [];
        tokensOfOwner = await Promise.all(
          Array.from(Array(balanceOfOwner).keys()).map(
            async (item: any): Promise<any> => {
              const token = await WndContract.methods.tokenOfOwnerByIndex(account, item).call();
              const tokenTraits = await WndContract.methods.getTokenTraits(token).call();
              const tokenURI = await WndContract.methods.tokenURI(token).call();

              return {
                id: token,
                tokenTraits,
                tokenURI: tokenURI.slice(29, tokenURI.length),
              };
            }
          )
        );

        tokensOfOwner = tokensOfOwner.sort((prev: any, curr: any) => +prev.id - +curr.id);

        const tokenWizards = tokensOfOwner.filter((token) => token?.tokenTraits?.isWizard);
        const tokenDragons = tokensOfOwner.filter((token) => !token?.tokenTraits?.isWizard);

        const ClaimedLogs = await WndContract.getPastEvents('Transfer', {
          filter: { from: TOWER_CONTRACT, to: account || '0x0' },
          fromBlock: 0,
          toBlock: 'latest',
        });

        const TokenStakedLogsOwner = await TowerContract.getPastEvents('TokenStaked', {
          filter: { owner: account || '0x0' },
          fromBlock: 0,
          toBlock: 'latest',
        });
        const accountLogs: any = [...TokenStakedLogsOwner, ...ClaimedLogs].sort(
          (a, b) => a.blockNumber - b.blockNumber || a.transactionIndex - b.transactionIndex
        );
        const depositOfOwnerLogs: any = new Set();

        for (const log of accountLogs) {
          const { owner, tokenId, to } = log.returnValues;
          if (owner === account) {
            depositOfOwnerLogs.add(tokenId.toString());
          } else if (to === account) {
            depositOfOwnerLogs.delete(tokenId.toString());
          }
        }

        let depositOfOwner = [];
        depositOfOwner = await Promise.all(
          Array.from(depositOfOwnerLogs).map(
            async (item: any): Promise<any> => {
              const tokenTraits = await WndContract.methods.getTokenTraits(item).call();
              const tokenURI = await WndContract.methods.tokenURI(item).call();
              const TokenStakedLogsFilter = await TowerContract.getPastEvents('TokenStaked', {
                filter: { tokenId: item },
                fromBlock: 0,
                toBlock: 'latest',
              });
              const lastItem = TokenStakedLogsFilter[TokenStakedLogsFilter.length - 1];
              let stakeInfo = {} as any;
              let isGuarding = false;
              if (tokenTraits.isWizard) {
                isGuarding = blockTimestamp / 1000 - +lastItem?.returnValues?.value < MINIMUM_TO_EXIT;
              } else {
                isGuarding = false;
              }

              const owed = +library?.utils?.fromWei(await TowerContract.methods.calculateRewards(item).call(), 'ether');

              return {
                id: item,
                tokenTraits,
                tokenURI: tokenURI.slice(29, tokenURI.length),
                stakeInfo,
                owed,
                isGuarding,
              };
            }
          )
        );

        depositOfOwner = depositOfOwner.sort((prev: any, curr: any) => +prev.id - +curr.id);

        const unclaimedGP = depositOfOwner.reduce((prev: any, curr: any) => prev + curr.owed, 0);
        const depositWizards = depositOfOwner.filter((token) => token?.tokenTraits?.isWizard);
        const depositDragons = depositOfOwner.filter((token) => !token?.tokenTraits?.isWizard);

        const currentGPAmount = +library?.utils?.fromWei(await GPContract.methods.totalSupply().call(), 'ether');

        setData({
          minted,
          paidTokens,
          maxTokens,
          stats,
          numDragonsStolen,
          numWizardsStolen,
          numDragons,
          numWizards,
          totalGPEarned: +(library?.utils.fromWei(totalGPEarned || 0, 'ether') || 0),
          totalStakePercent,
          mintCost: +(library?.utils.fromWei(mintCost || 0, 'ether') || 0),
          balanceOfTokenUser: +(library?.utils.fromWei(balanceOfTokenUser || 0, 'ether') || 0),
          tokenWizards,
          tokenDragons,
          depositWizards,
          depositDragons,
          DAILY_GP_RATE: DAILY_GP_RATE_CONVERT,
          blockTimestamp,
          MAXIMUM_GLOBAL_GP: MAXIMUM_GLOBAL_GP_CONVERT,
          leaderboardData,
          unclaimedGP,
          numWizardsBurned,
          numDragonsBurned,
          isGamePaused,
          currentGPAmount,
          hasMintPending,
          canMint,
          dragonsLeftToSacrifice,
          wizardsLeftToSacrifice,
          totalGPBurned,
        });
        setLoading('');
      } catch (err) {
        throw err;
      }
    }
  };

  const handleMint = async (amount: number, isStake: boolean) => {
    try {
      if (amount * mintCost > balanceOfTokenUser || balanceOfTokenUser === 0) {
        message.error('Insufficient balance');
        return;
      }
      const { contract: WndGameContract } = await getContractWnDGame(connector);
      await WndGameContract.methods.mintCommit(amount, isStake).call({
        from: account,
      });
      await WndGameContract.methods
        .mintCommit(amount, isStake)
        .send({
          from: account,
        })
        .on('transactionHash', async () => {
          setLoading('Minting... ');
        })
        .on('receipt', async () => {
          setLoading('');
          setConfirming('Confirming...');
          notification.success({
            message: '',
            description: !isStake ? 'Mint success' : 'Mint & stake success',
          });
          tryNTimes(() => getBlockchainData(!isStake ? 'Mint success' : 'Mint & stake success'));
        });
    } catch (err) {
      handleError(err);
      setLoading('');
    }
  };

  const handleClaimMint = async () => {
    try {
      const { contract: WndGameContract } = await getContractWnDGame(connector);
      await WndGameContract.methods.mintReveal().call({
        from: account,
      });
      await WndGameContract.methods
        .mintReveal()
        .send({
          from: account,
        })
        .on('transactionHash', async () => {
          setLoading('Claiming mint... ');
        })
        .on('receipt', async (receipt: any) => {
          let logs = [];
          if (Array.isArray(receipt?.events?.WizardStolen)) {
            receipt?.events?.WizardStolen.forEach((item: any) => {
              const { tokenId } = item?.returnValues;
              logs.push({
                tokenId,
                isWizard: true,
              });
            });
          } else if (receipt?.events?.WizardStolen) {
            const { tokenId } = receipt?.events?.WizardStolen?.returnValues;
            logs.push({
              tokenId,
              isWizard: true,
            });
          }

          if (Array.isArray(receipt?.events?.DragonStolen)) {
            receipt?.events?.DragonStolen.forEach((item: any) => {
              const { tokenId } = item?.returnValues;
              logs.push({
                tokenId,
                isWizard: false,
              });
            });
          } else if (receipt?.events?.DragonStolen) {
            const { tokenId } = receipt?.events?.DragonStolen?.returnValues;
            logs.push({
              tokenId,
              isWizard: false,
            });
          }

          let results = [] as any;

          logs.forEach((item: any) => {
            if (item.isWizard) {
              results.push({
                message: `Wizard #${item.tokenId} was stolen`,
              });
            } else {
              results.push({
                message: `Dragon #${item.tokenId} was stolen`,
              });
            }
          });
          setLoading('');
          if (results.length > 0) {
            setWhatHappen(results);
            toggleOpen();
          }
          setConfirming('Confirming...');
          notification.success({
            message: '',
            description: 'Claim mint success',
          });
          tryNTimes(() => getBlockchainData('Claim mint success'));
        });
    } catch (err) {
      handleError(err);
      setLoading('');
    }
  };

  const handleStake = async (tokenIds: string[], clearSelect: any) => {
    try {
      const { contract: TowerContract } = await getContractTower(connector);
      await TowerContract.methods.addManyToTowerAndFlight(account, tokenIds).call({
        from: account,
      });
      await TowerContract.methods
        .addManyToTowerAndFlight(account, tokenIds)
        .send({
          from: account,
        })
        .on('transactionHash', async () => {
          setLoading('Staking... ');
        })
        .on('receipt', async () => {
          clearSelect();
          setLoading('');
          setConfirming('Confirming...');
          notification.success({
            message: '',
            description: 'Stake success',
          });
          tryNTimes(() => getBlockchainData('Stake success'));
        });
    } catch (err) {
      handleError(err);
      setLoading('');
    }
  };

  const handleSacrifice = async (tokenId: string, gpAmt: number) => {
    try {
      const { contract: WnDGameContract } = await getContractWnDGame(connector);
      await WnDGameContract.methods.sacrifice(tokenId, library?.utils?.toWei('' + gpAmt, 'ether')).call({
        from: account,
      });
      await WnDGameContract.methods
        .sacrifice(tokenId, library?.utils?.toWei('' + gpAmt, 'ether'))
        .send({
          from: account,
        })
        .on('transactionHash', async () => {
          setLoading('Sacrificing... ');
        })
        .on('receipt', async () => {
          setLoading('');
          setConfirming('Confirming...');
          notification.success({
            message: '',
            description: 'Sacrifice success',
          });
          tryNTimes(() => getBlockchainData('Sacrifice success'));
        });
    } catch (err) {
      handleError(err);
      setLoading('');
    }
  };

  const handleUnStake = async (tokenIds: string[], isUnStake: boolean, clearSelect: any) => {
    try {
      const { contract: TowerContract } = await getContractTower(connector);
      await TowerContract.methods.claimManyFromTowerAndFlight(tokenIds, isUnStake).call({
        from: account,
      });
      await TowerContract.methods
        .claimManyFromTowerAndFlight(tokenIds, isUnStake)
        .send({
          from: account,
        })
        .on('transactionHash', async () => {
          setLoading(isUnStake ? 'UnStaking and Claiming... ' : 'Claiming... ');
        })
        .on('receipt', async (receipt: any) => {
          clearSelect();
          let logs = [];
          if (Array.isArray(receipt?.events?.DragonClaimed)) {
            receipt?.events?.DragonClaimed.forEach((item: any) => {
              const { earned, tokenId, unstaked } = item?.returnValues;
              logs.push({
                earned: +(library?.utils.fromWei(earned || 0, 'ether') || 0),
                tokenId,
                isWizard: false,
                unstaked,
              });
            });
          } else if (receipt?.events?.DragonClaimed) {
            const { earned, tokenId, unstaked } = receipt?.events?.DragonClaimed?.returnValues;
            logs.push({
              earned: +(library?.utils.fromWei(earned || 0, 'ether') || 0),
              tokenId,
              isWizard: false,
              unstaked,
            });
          }

          if (Array.isArray(receipt?.events?.WizardClaimed)) {
            receipt?.events?.WizardClaimed.forEach((item: any) => {
              const { earned, tokenId, unstaked } = item?.returnValues;
              logs.push({
                earned: +(library?.utils.fromWei(earned || 0, 'ether') || 0),
                tokenId,
                isWizard: true,
                unstaked,
              });
            });
          } else if (receipt?.events?.WizardClaimed) {
            const { earned, tokenId, unstaked } = receipt?.events?.WizardClaimed?.returnValues;
            logs.push({
              earned: +(library?.utils.fromWei(earned || 0, 'ether') || 0),
              tokenId,
              isWizard: true,
              unstaked,
            });
          }
          let results = [] as any;

          logs.forEach((item: any) => {
            if (item.isWizard) {
              if (item.unstaked) {
                if (item.earned === 0) {
                  results.push({
                    message: `Wizard #${item.tokenId} left the tower, but all its $GP was stolen by Dragons!`,
                  });
                } else {
                  results.push({
                    message: `Wizard #${
                      item.tokenId
                    } left the tower and evaded the Dragons, earning ${item.earned.toFixed(2)} $GP`,
                  });
                }
              } else {
                results.push({
                  message: `Wizard #${item.tokenId} earned ${item.earned.toFixed(
                    2
                  )} $GP, after paying a 20% tax to the Dragons.`,
                });
              }
            } else {
              if (item.unstaked) {
                results.push({
                  message: `Dragons #${item.tokenId} left the Flight, and received ${item.earned.toFixed(2)} $GP!`,
                });
              } else {
                results.push({
                  message: `Dragons #${item.tokenId} collected a tax of ${item.earned.toFixed(2)} $GP!`,
                });
              }
            }
          });
          setLoading('');
          setWhatHappen(results);
          setConfirming('Confirming...');
          toggleOpen();
          notification.success({
            message: '',
            description: isUnStake ? 'UnStake & Claim success' : 'Claim success',
          });
          tryNTimes(() => getBlockchainData(isUnStake ? 'UnStake & Claim success' : 'Claim success', true));
        });
    } catch (err) {
      handleError(err);
      setLoading('');
    }
  };

  const handleTribute = async (gpAmt: number) => {
    try {
      const { contract: WndGameContract } = await getContractWnDGame(connector);
      await WndGameContract.methods.payTribute(library?.utils?.toWei('' + gpAmt, 'ether')).call({
        from: account,
      });
      await WndGameContract.methods
        .payTribute(library?.utils?.toWei('' + gpAmt, 'ether'))
        .send({
          from: account,
        })
        .on('transactionHash', async () => {
          setLoading('Paying Tribute... ');
        })
        .on('receipt', async () => {
          setLoading('');
          setConfirming('Confirming...');
          notification.success({
            message: '',
            description: 'Tribute success',
          });
          tryNTimes(() => getBlockchainData('Tribute success'));
        });
    } catch (err) {
      handleError(err);
      setLoading('');
    }
  };

  const handleMakeTreasure = async () => {
    try {
      const { contract: WndGameContract } = await getContractWnDGame(connector);
      await WndGameContract.methods.makeTreasureChests(1).call({
        from: account,
      });
      await WndGameContract.methods
        .makeTreasureChests(1)
        .send({
          from: account,
        })
        .on('transactionHash', async () => {
          setLoading('Making Treasure... ');
        })
        .on('receipt', async () => {
          setLoading('');
          setConfirming('Confirming...');
          notification.success({
            message: '',
            description: 'Making Treasure success',
          });
          tryNTimes(() => getBlockchainData('Making Treasure success'));
        });
    } catch (err) {
      handleError(err);
      setLoading('');
    }
  };

  useEffect(() => {
    getBlockchainData('', null, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connector, account, active, library]);

  const {
    minted,
    paidTokens,
    stats,
    numDragonsStolen,
    numWizardsStolen,
    numDragons,
    numWizards,
    totalGPEarned,
    totalStakePercent,
    mintCost,
    balanceOfTokenUser,
    tokenWizards,
    tokenDragons,
    depositWizards,
    depositDragons,
    leaderboardData,
    unclaimedGP,
    numDragonsBurned,
    numWizardsBurned,
    MAXIMUM_GLOBAL_GP,
    maxTokens,
    isGamePaused,
    currentGPAmount,
    hasMintPending,
    canMint,
    dragonsLeftToSacrifice,
    wizardsLeftToSacrifice,
    totalGPBurned,
  } = data;

  const isStaking = depositWizards.length + depositDragons.length > 0;
  const buttonDisabled = loading || confirming !== '';
  return (
    <Wrapper>
      {loading && (
        <Confirm>
          <Spin indicator={loadingIcon} />
          <Typography className="shadow">{loading}</Typography>
        </Confirm>
      )}
      {open && <WhatHappenModal toggleOpen={toggleOpen} open={open} whatHappen={whatHappen} />}

      <Container>
        {confirming !== '' && (
          <Confirm>
            <Spin indicator={loadingIcon} />
            <Typography className="shadow primary">FETCHING</Typography>
          </Confirm>
        )}
        <MiddleTextSection
          minted={minted}
          paidTokens={paidTokens}
          isStaking={isStaking}
          buttonDisabled={buttonDisabled}
        />

        {active && (
          <StakingSection
            balanceOfTokenUser={balanceOfTokenUser}
            tokenDragons={tokenDragons}
            tokenWizards={tokenWizards}
            depositWizards={depositWizards}
            depositDragons={depositDragons}
            handleStake={handleStake}
            handleUnStake={handleUnStake}
            totalGPEarned={totalGPEarned}
            unclaimedGP={unclaimedGP}
            buttonDisabled={buttonDisabled}
          />
        )}

        {active && (
          <>
            <StyledRow>
              <MintingSection
                minted={minted}
                paidTokens={paidTokens}
                mintCost={mintCost}
                handleMint={handleMint}
                maxToken={maxTokens}
                buttonDisabled={buttonDisabled}
                isGamePaused={isGamePaused}
                hasMintPending={hasMintPending}
                handleClaimMint={handleClaimMint}
                canMint={canMint}
              />
              {/* )} */}
              <GameDataSection
                stats={stats}
                numDragons={numDragons}
                numWizards={numWizards}
                numDragonsStolen={numDragonsStolen}
                numWizardsStolen={numWizardsStolen}
                currentGPAmount={currentGPAmount}
                totalGPEarned={totalGPEarned}
                totalStakePercent={totalStakePercent}
                leaderboardData={leaderboardData}
                MAXIMUM_GLOBAL_GP={MAXIMUM_GLOBAL_GP}
                buttonDisabled={buttonDisabled}
                totalGPBurned={totalGPBurned}
              />
            </StyledRow>
            <StyledGrid>
              <SacrificeSection
                tokenWizards={tokenWizards}
                tokenDragons={tokenDragons}
                mintCost={mintCost}
                balanceOfTokenUser={balanceOfTokenUser}
                handleSacrifice={handleSacrifice}
                numDragonsBurned={numDragonsBurned}
                numWizardsBurned={numWizardsBurned}
                handleTribute={handleTribute}
                buttonDisabled={buttonDisabled}
                isGamePaused={isGamePaused}
                dragonsLeftToSacrifice={dragonsLeftToSacrifice}
                wizardsLeftToSacrifice={wizardsLeftToSacrifice}
              />
              <TreasureChest
                balanceOfTokenUser={balanceOfTokenUser}
                handleMakeTreasure={handleMakeTreasure}
                buttonDisabled={buttonDisabled}
                isGamePaused={isGamePaused}
              />
            </StyledGrid>
          </>
        )}
      </Container>
    </Wrapper>
  );
};

const Container = styled.div`
  padding: 50px 50px 0;
  max-width: 1440px;
  margin: 0 auto;
  @media (max-width: 768px) {
    padding: 20px;
  }
`;
const Wrapper = styled.div`
  /* background-image: url(${background});
  min-height: 100vh;
  background-repeat: no-repeat;
  background-size: cover; */
`;

const StyledRow = styled.div`
  display: grid;
  margin-bottom: 50px;
  grid-template-columns: 49% 49%;
  grid-column-gap: 2%;
  @media (max-width: 768px) {
    display: block;
  }
`;

const StyledGrid = styled.div`
  display: grid;
  margin-bottom: 50px;
  grid-template-columns: 69% 29%;
  grid-column-gap: 2%;
  @media (max-width: 768px) {
    display: block;
  }
`;

const Confirm = styled.div`
  position: fixed;
  right: 15px;
  top: 20vh;
  width: 300px;
  height: 50px;
  background-image: url(${confirmBg});
  opacity: 1;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  color: black;
  font-size: 12px;
  z-index: 125;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
  .anticon {
    font-size: 26px !important;
    margin-right: 10px;
  }
`;

export default HomePage;
