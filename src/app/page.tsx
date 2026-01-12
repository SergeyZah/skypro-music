import './page.css';
import Navigate from '../components/Navigate/Navigate';
import styles from './page.module.css';
import Centerblock from '../components/Centerblock/Centerblock';
import Sidebar from '../components/Sidebar/Sidebar';
import Bar from '../components/Bar/Bar';

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Navigate />
          <Centerblock />
          <Sidebar />
        </main>
        <Bar />
        <footer className="footer"></footer>
      </div>
    </div>
  );
}
