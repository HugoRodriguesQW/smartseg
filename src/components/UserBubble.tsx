import { useState } from 'react'
import styles from '../styles/components/UserBubble.module.css'
import { OptionSwitch } from './OptionSwitch'

export function UserBubble({ ...rest }) {
  const [active, setActive] = useState(false)
  const [logged, setLogged] = useState(false)

  function handleLogin() {
    setLogged(true)
  }

  function handleExit() {
    setLogged(false)
  }

  function handleClick() {
    setActive(true)
  }

  function handleClickOutside() {
    setActive(false)
  }
  return (
    <>
      <div
        onClick={handleClickOutside}
        className={`${styles.overlay} ${active ? styles.active : ''}`}
      ></div>
      <div className={`${styles.container} ${active ? styles.active : ''}`}>
        <div className={styles.content}>
          <main className={styles.contentFrame}>
            <div className={styles.profileFrame}>
              <div
                onClick={handleClick}
                className={styles.profileImageFrame}
                {...rest}
              >
                {!logged && <i className={styles.defaultProfileImage} />}
                {logged && (
                  <img
                    className={styles.profileImage}
                    src="/profile_demo.jpeg"
                  />
                )}
              </div>

              {logged && (
                <div className={styles.identifierFrame}>
                  <p className={styles.name}>HUGO RODRIGUES</p>
                  <p className={styles.type}>administrador</p>
                </div>
              )}
            </div>

            {logged && (
              <div className={styles.settingsFrame}>
                <a className={styles.profileSettingFrame}>
                  <i className={styles.profileSettingIcon} /> Meu perfil
                </a>
                <OptionSwitch
                  name="Notificações"
                  icon="notification"
                  initial={true}
                  callback={() => {return null}}
                />
                <OptionSwitch
                  name="Modo noturno"
                  icon="moon"
                  initial={false}
                  callback={() => {return null}}
                />
              </div>
            )}

            <div className={styles.bottomFrame}>
              <a className={styles.helpButton}>
                <i className={styles.helpIcon} />
                <p>ajuda</p>
              </a>

              {logged && (
                <button onClick={handleExit} className={styles.exitButton}>
                  sair
                </button>
              )}
              {!logged && (
                <button onClick={handleLogin} className={styles.loginButton}>
                  entrar
                </button>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
