import { useState } from "react";
import { BlockchainDataProvider } from "../context/BlockchainDataContext";
import { useChainSelectionContext } from "../context/ChainSelectionContext";
import { chains, sortingModes } from "../config/config";
import Blockchain from "../components/Blockchain";
import ConnectionIndicator from "../components/ConnectionIndicator";
import LegendModal from "../components/LegendModal";
import styles from "../styles/Home.module.css";

export default function Home() {
  const { selectedChain, setSelectedChain } = useChainSelectionContext();
  const [sortingMode, setSortingMode] = useState("default");
  const [modalOpen, setModalOpen] = useState(false);

  const handleChainChange = (e) => {
    const key = e.target.value;
    setSelectedChain(chains[key]);
  };

  const handleSortingChange = (e) => {
    setSortingMode(e.target.value);
  };

  const toggleModal = () => {
    setModalOpen((prev) => !prev);
  };

  return (
    <BlockchainDataProvider key={selectedChain.name} chain={selectedChain}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.headerLogoWrapper}>
              <button className={styles.headerButton} onClick={toggleModal}>
                <img src="/favicon.svg" className={styles.headerIcon} />
              </button>
            </div>
            <div className={styles.headerTitleWrapper}>
              <div className={styles.headerTitle}>EmojiBlocks</div>
              <ConnectionIndicator />
            </div>
          </div>
          <div className={styles.headerRight}>
            <select
              className={styles.dropdown}
              value={selectedChain.key}
              onChange={handleChainChange}
              autoComplete="off"
            >
              {Object.entries(chains).map(([key, chain]) => (
                <option key={key} value={key}>
                  {chain.name}
                </option>
              ))}
            </select>
            <select
              className={styles.dropdown}
              value={sortingMode}
              onChange={handleSortingChange}
              autoComplete="off"
            >
              {Object.entries(sortingModes).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </header>

        <Blockchain sortingMode={sortingMode} />

        {modalOpen && <LegendModal onClose={toggleModal} />}

        <footer className={styles.footer}>made with ❤️ by treebeard</footer>
      </div>
    </BlockchainDataProvider>
  );
}
