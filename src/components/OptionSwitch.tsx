import { useState } from 'react'
import styles from '../styles/components/OptionSwitch.module.css'

type OptionSwitchData = {
  icon: 'moon' | 'notification'
  name: String
  initial: boolean | undefined
  callback: (state: boolean | undefined) => void
}

export function OptionSwitch({
  icon,
  name,
  initial,
  callback,
}: OptionSwitchData) {
  const [activated, setActivated] = useState(initial)

  function handleChange() {
    setActivated(!activated)
    callback(activated)
  }

  return (
    <div className={styles.container}>
      <p className={styles.name}>
        <i className={styles[icon]} /> {name}
      </p>

      <label>
        <input type="checkbox" defaultChecked={activated} />
        <span className={styles.checkmark}></span>
      </label>
    </div>
  )
}
