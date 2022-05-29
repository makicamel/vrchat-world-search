import { Dispatch, SetStateAction } from 'react'
import styles from '../styles/Home.module.css'

const Header: React.FC<{
  setAuthorId: Dispatch<SetStateAction<string | undefined>>
}>
  = ({ setAuthorId }): JSX.Element => (
    <header className={styles.header} onClick={() => setAuthorId(undefined)}>
      VRChat World Search
    </header>
  )

export default Header
