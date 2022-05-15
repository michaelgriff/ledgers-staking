import logo from "./logo.svg";
import "./App.css";
import Web3 from "web3";
import ledgers_abi from "./ledgers_abi.json";
import stake_abi from "./stake_abi.json";
import { useState, useEffect } from "react";
import ledger from "./135.png";
import WalletConnectProvider from "@walletconnect/web3-provider";
import {
  BannerContainer,
  BannerLine,
  BannerTitle,
} from "./components/Banner/BannerElements";
import {
  DisplayContainer,
  DisplayHalf,
  DisplayModal,
  ModalButton,
  ModalImage,
  ModalImageGold,
  ModalRow,
  ModalRowElement,
} from "./components/Display/DisplayElements";
import {
  StatRed,
  StatSilver,
  StatGold,
  StatsContainer,
  StatsRow,
} from "./components/Stats/StatsElements";
import ApprovedModal from "./components/ApprovedModal/ApprovedModal";
import {
  ConnectButton,
  ConnectContainer,
} from "./components/Connect/ConnectElements";
import LoadingScreen from "./components/Loading";
import ConnectModal from "./components/ConnectModal/ConnectModal";

function App() {
  const [provider, setProvider] = useState();
  const [account, setAccount] = useState();
  const [staked, setStaked] = useState([]);
  const [unstaked, setUnstaked] = useState([]);
  const [toStake, setToStake] = useState([]);
  const [toUnstake, setToUnstake] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [approved, setApproved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showConnectModal, setConnectShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const toggleConnectModal = () => {
    setConnectShowModal((prev) => !prev);
  };

  const connect = async () => {
    setLoading(true);
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setProvider(window.ethereum);
      setAccount(accounts[0]);
      await getTokens(accounts[0], window.ethereum);
    } catch {
      console.log("error");
    }
  };

  const walletConnect = async () => {
    setLoading(true);
    const test_provider = new WalletConnectProvider({
      chainId: 4,
      rpc: {
        4: "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
      },
    });

    // if (test_provider.chainId != 1) {
    //   // FIX
    //   console.log("wrong network");
    //   return;
    // }

    test_provider
      .enable()
      .then((result) => {
        if (result.length) {
          setAccount(result[0]);
          setProvider(test_provider);
          getTokens(result[0], test_provider);
        } else {
          console.log("Something went wrong, try again");
          return;
        }
      })
      .catch(() => {
        console.log("Something went wrong, try again");
      });
  };

  const getTokens = async (userAccount, theProvider) => {
    const web3 = new Web3(theProvider);
    let contract = new web3.eth.Contract(
      ledgers_abi,
      "0xEa2968F4841Fe0f12DF5274abeae13E9B77e721f"
    );
    console.log(contract);

    let stakedTokenIds = [];
    let unstakedTokenIds = [];

    for (let i = 1; i < 11; i++) {
      let owner = await contract.methods.ownerOf(i).call();

      if (owner.toLowerCase() === userAccount.toLowerCase()) {
        unstakedTokenIds.push(i);
      } else if (
        owner.toLowerCase() ===
        "0x6b761F7fcdAcF4C903D3ceeb549C9827577dc941".toLowerCase()
      ) {
        stakedTokenIds.push(i);
      }
    }
    setLoading(false);
    setUnstaked(unstakedTokenIds);
    setStaked(stakedTokenIds);
    await getApproved(userAccount, theProvider);
  };

  const getApproved = async (account, theProvider) => {
    console.log(provider);
    const web3 = new Web3(theProvider);
    let contract = new web3.eth.Contract(
      ledgers_abi,
      "0xEa2968F4841Fe0f12DF5274abeae13E9B77e721f"
    );

    const isApproved = await contract.methods
      .isApprovedForAll(account, "0x6b761F7fcdAcF4C903D3ceeb549C9827577dc941")
      .call();

    setApproved(isApproved);
    if (!isApproved) {
      toggleModal();
    }
  };

  const setApprovalForAll = async () => {
    setLoading(true);

    const web3 = new Web3(provider);
    let contract = new web3.eth.Contract(
      ledgers_abi,
      "0xea2968f4841fe0f12df5274abeae13e9b77e721f"
    );

    contract.methods
      .setApprovalForAll("0x6b761F7fcdAcF4C903D3ceeb549C9827577dc941", true)
      .estimateGas({ from: account })
      .then((gasAmount) => {
        contract.methods
          .setApprovalForAll("0x6b761F7fcdAcF4C903D3ceeb549C9827577dc941", true)
          .send({
            from: account,
            to: "0xea2968f4841fe0f12df5274abeae13e9b77e721f",
            gasLimit: gasAmount,
          })
          .then(() => {
            setLoading(false);
            toggleModal();
          })
          .catch(() => {
            setLoading(false);
          });
      });
  };

  const stake = async (tokenId) => {
    if (!approved) {
      toggleModal();
      return;
    }
    const web3 = new Web3(provider);
    let contract = new web3.eth.Contract(
      stake_abi,
      "0x6b761F7fcdAcF4C903D3ceeb549C9827577dc941"
    );

    contract.methods
      .stake(tokenId)
      .estimateGas({ from: account })
      .then((gasAmount) => {
        contract.methods
          .stake(tokenId)
          .send({
            from: account,
            to: "0x6b761F7fcdAcF4C903D3ceeb549C9827577dc941",
            gasLimit: gasAmount,
          })
          .then(() => {
            getTokens(account, provider);
          })
          .catch(() => {
            setLoading(false);
          });
      });
  };

  const unstake = async (tokenId) => {
    if (!approved) {
      toggleModal();
      return;
    }
    const web3 = new Web3(provider);
    let contract = new web3.eth.Contract(
      stake_abi,
      "0x6b761F7fcdAcF4C903D3ceeb549C9827577dc941"
    );

    contract.methods
      .unstake(tokenId)
      .estimateGas({ from: account })
      .then((gasAmount) => {
        contract.methods
          .unstake(tokenId)
          .send({
            from: account,
            to: "0x6b761F7fcdAcF4C903D3ceeb549C9827577dc941",
            gasLimit: gasAmount,
          })
          .then(() => {
            getTokens(account, provider);
          })
          .catch(() => {
            setLoading(false);
          });
      });
  };

  const batchStake = async () => {
    setLoading(true);
    for (let i = 0; i < toStake.length; i++) {
      await stake(toStake[i]);
    }
    setToStake([]);
  };

  const batchUnstake = async () => {
    setLoading(true);
    for (let i = 0; i < toUnstake.length; i++) {
      await unstake(toUnstake[i]);
    }
    setToUnstake([]);
  };

  const onUnstakedSelect = (event) => {
    if (toStake.includes(event.target.alt)) {
      setToStake(
        toStake.filter((elem) => {
          return elem !== event.target.alt;
        })
      );
    } else {
      setToStake([...toStake, event.target.alt]);
    }
  };

  const onStakedSelect = (event) => {
    if (toUnstake.includes(event.target.alt)) {
      setToUnstake(
        toUnstake.filter((elem) => {
          return elem !== event.target.alt;
        })
      );
    } else {
      setToUnstake([...toUnstake, event.target.alt]);
    }
  };

  return (
    <div className="App">
      <>
        {loading ? <LoadingScreen loading={loading} /> : null}
        <ApprovedModal
          showModal={showModal}
          setShowModal={setShowModal}
          setApprovalForAll={setApprovalForAll}
        />
        <BannerContainer>
          <BannerLine></BannerLine>
          <BannerTitle>THE LEDGE LAB</BannerTitle>
          <BannerLine></BannerLine>
        </BannerContainer>
        <>
          {account ? (
            <>
              <DisplayContainer>
                <DisplayHalf>
                  <p>STAKEABLE</p>
                  <DisplayModal>
                    {unstaked
                      .reduce(function (rows, key, index) {
                        return (
                          (index % 3 == 0
                            ? rows.push([key])
                            : rows[rows.length - 1].push(key)) && rows
                        );
                      }, [])
                      .map((value) => {
                        return (
                          <ModalRow>
                            {value.map((elem) => {
                              return (
                                <>
                                  <ModalRowElement>
                                    {toStake.includes(elem.toString()) ? (
                                      <ModalImageGold
                                        src={ledger}
                                        alt={elem}
                                        onClick={onUnstakedSelect}
                                      />
                                    ) : (
                                      <ModalImage
                                        src={ledger}
                                        alt={elem}
                                        onClick={onUnstakedSelect}
                                      />
                                    )}
                                    <p>{elem}</p>
                                  </ModalRowElement>
                                </>
                              );
                            })}
                          </ModalRow>
                        );
                      })}
                    <br />
                    <br />
                    <br />
                    <ModalButton
                      disabled={!toStake.length}
                      onClick={batchStake}
                    >
                      STAKE
                    </ModalButton>
                  </DisplayModal>
                </DisplayHalf>
                <DisplayHalf>
                  <p>STAKED</p>
                  <DisplayModal>
                    {staked
                      .reduce(function (rows, key, index) {
                        return (
                          (index % 3 == 0
                            ? rows.push([key])
                            : rows[rows.length - 1].push(key)) && rows
                        );
                      }, [])
                      .map((value) => {
                        return (
                          <ModalRow>
                            {value.map((elem, ind) => {
                              return (
                                <>
                                  <ModalRowElement>
                                    {toUnstake.includes(elem.toString()) ? (
                                      <ModalImageGold
                                        src={ledger}
                                        alt={elem}
                                        onClick={onStakedSelect}
                                      />
                                    ) : (
                                      <ModalImage
                                        src={ledger}
                                        alt={elem}
                                        onClick={onStakedSelect}
                                      />
                                    )}
                                    <p>{elem}</p>
                                  </ModalRowElement>
                                </>
                              );
                            })}
                          </ModalRow>
                        );
                      })}
                    <br />
                    <br />
                    <br />
                    <ModalButton
                      disabled={!toUnstake.length}
                      onClick={batchUnstake}
                    >
                      UNSTAKE
                    </ModalButton>
                  </DisplayModal>
                </DisplayHalf>
              </DisplayContainer>
              <StatsContainer>
                <p>Staking Stats</p>
                <StatsRow>
                  <StatRed>
                    <p>VIP</p>
                    <p class="smaller-text">
                      {staked.filter((elem) => elem < 115).length} of{" "}
                      {staked.length + unstaked.length}
                    </p>
                  </StatRed>
                  <StatSilver>
                    <p>Plat</p>
                    <p class="smaller-text">
                      {
                        staked.filter((elem) => elem >= 115 && elem < 255)
                          .length
                      }{" "}
                      of {staked.length + unstaked.length}
                    </p>
                  </StatSilver>
                  <StatGold>
                    <p>Gold</p>
                    <p class="smaller-text">
                      {staked.filter((elem) => elem >= 255).length} of{" "}
                      {staked.length + unstaked.length}
                    </p>
                  </StatGold>
                </StatsRow>
              </StatsContainer>
            </>
          ) : (
            <ConnectContainer>
              <ConnectButton onClick={toggleConnectModal}>
                Connect
              </ConnectButton>
              <ConnectModal
                walletConnect={walletConnect}
                connect={connect}
                showConnectModal={showConnectModal}
                setConnectShowModal={setConnectShowModal}
              />
            </ConnectContainer>
          )}
        </>
      </>
    </div>
  );
}

export default App;
