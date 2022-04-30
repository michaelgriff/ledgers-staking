import logo from "./logo.svg";
import "./App.css";
import Web3 from "web3";
import ledgers_abi from "./ledgers_abi.json";
import stake_abi from "./stake_abi.json";
import { useState } from "react";
import ledger from "./135.png";
import {
  BannerContainer,
  BannerLine,
  BannerTitle,
} from "./components/BannerElements";
import {
  DisplayContainer,
  DisplayHalf,
  DisplayModal,
  ModalButton,
  ModalImage,
  ModalImageGold,
  ModalRow,
  ModalRowElement,
} from "./components/DisplayElements";
import {
  StatRed,
  StatSilver,
  StatGold,
  StatsContainer,
  StatsRow,
} from "./components/StatsElements";
import ApprovedModal from "./components/ApprovedModal/ApprovedModal";

function App() {
  const [account, setAccount] = useState();
  const [staked, setStaked] = useState([]);
  const [unstaked, setUnstaked] = useState([]);
  const [toStake, setToStake] = useState([]);
  const [toUnstake, setToUnstake] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const arr = [1, 2, 3];

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const connect = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setAccount(accounts[0]);
    } catch {
      console.log("error");
    }
  };

  const getTokens = async () => {
    const web3 = new Web3(window.ethereum);
    let contract = new web3.eth.Contract(
      ledgers_abi,
      "0xea2968f4841fe0f12df5274abeae13e9b77e721f"
    );

    let stakedTokenIds = [];
    let unstakedTokenIds = [];

    for (let i = 1; i < 11; i++) {
      let owner = await contract.methods.ownerOf(i).call();
      if (owner.toLowerCase() === account.toLowerCase()) {
        unstakedTokenIds.push(i);
      } else if (
        owner.toLowerCase() ===
        "0x6b761F7fcdAcF4C903D3ceeb549C9827577dc941".toLowerCase()
      ) {
        stakedTokenIds.push(i);
      }
    }
    console.log(unstakedTokenIds);
    console.log(stakedTokenIds);
    setUnstaked(unstakedTokenIds);
    console.log(unstaked);
    setStaked(stakedTokenIds);
  };

  const setApprovalForAll = async () => {
    const web3 = new Web3(window.ethereum);
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
          });
      });
  };

  const stake = async (tokenId) => {
    const web3 = new Web3(window.ethereum);
    let contract = new web3.eth.Contract(
      stake_abi,
      "0x6b761F7fcdAcF4C903D3ceeb549C9827577dc941"
    );

    contract.methods
      .stake(tokenId)
      .estimateGas({ from: account })
      .then((gasAmount) => {
        contract.methods.stake(tokenId).send({
          from: account,
          to: "0x6b761F7fcdAcF4C903D3ceeb549C9827577dc941",
          gasLimit: gasAmount,
        });
      });
  };

  const unstake = async (tokenId) => {
    const web3 = new Web3(window.ethereum);
    let contract = new web3.eth.Contract(
      stake_abi,
      "0x6b761F7fcdAcF4C903D3ceeb549C9827577dc941"
    );

    contract.methods
      .unstake(tokenId)
      .estimateGas({ from: account })
      .then((gasAmount) => {
        contract.methods.unstake(tokenId).send({
          from: account,
          to: "0x6b761F7fcdAcF4C903D3ceeb549C9827577dc941",
          gasLimit: gasAmount,
        });
      });
  };

  const batchStake = async () => {
    for (let i = 0; i < toStake.length; i++) {
      await stake(toStake[i]);
    }
  };

  const batchUnstake = async () => {
    for (let i = 0; i < toUnstake.length; i++) {
      await unstake(toUnstake[i]);
    }
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
    console.log(event.target.alt);
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
        <ApprovedModal showModal={showModal} setShowModal={setShowModal} />
        <BannerContainer>
          <BannerLine></BannerLine>
          <BannerTitle>THE LEDGE LAB</BannerTitle>
          <BannerLine></BannerLine>
        </BannerContainer>
        <DisplayContainer>
          <DisplayHalf>
            <p>STAKEABLE</p>
            <DisplayModal>
              {arr
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
              <ModalButton onClick={toggleModal}>STAKE</ModalButton>
            </DisplayModal>
          </DisplayHalf>
          <DisplayHalf>
            <p>STAKED</p>
            <DisplayModal>
              {arr
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
              <ModalButton>UNSTAKE</ModalButton>
            </DisplayModal>
          </DisplayHalf>
        </DisplayContainer>

        <StatsContainer>
          <p>Staking Stats</p>
          <StatsRow>
            <StatRed>
              <p>VIP</p>
              <p>1/2</p>
            </StatRed>
            <StatSilver>
              <p>Plat</p>
              <p>1/2</p>
            </StatSilver>
            <StatGold>
              <p>Gold</p>
              <p>1/2</p>
            </StatGold>
          </StatsRow>
        </StatsContainer>
        {/* <button onClick={connect}>Connect</button>
      <button onClick={getTokens}>Get Tokens</button>
      <button onClick={setApprovalForAll}>Set Approval For All</button>
      <button onClick={batchStake}>Stake</button>
      <button onClick={batchUnstake}>Unstake</button>
      <br />
      <p>Unstaked</p>
      <div>
        {unstaked.map((value, index) => (
          <>
            <input
              type="image"
              value={value}
              src={ledger}
              alt={"alt"}
              height={100}
              width={100}
              onClick={onUntakedSelect}
            />
          </>
        ))}
      </div>
      <br />
      <p>Staked</p>
      <div>
        {staked.map((value, index) => (
          <>
            <input
              type="image"
              value={value}
              src={ledger}
              alt={"alt"}
              height={100}
              width={100}
              onClick={onStakedSelect}
            />
          </>
        ))}
      </div> */}
      </>
    </div>
  );
}

export default App;
