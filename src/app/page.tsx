import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          By Conlangers & Pentalingo (UW Seattle '23)
        </p>
        <div>
          <Image
            src="/iSchoolPrimary_RGB_Purple.jpg"
            alt="UW iSchool Logo"
            className={styles.vercelLogo}
            width={200}
            height={37.525}
            priority
          />          
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/langtime_studio_logo-transformed.png"
          alt="LangTime Logo"
          width={400}
          height={239.38}
          priority
        />
      </div>

      <div className={styles.grid}>
        <a
          href="/login"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={inter.className}>
            Log In <span>-&gt;</span>
          </h2>
          <p className={inter.className}>
            Create and manage the dictionary for your own Conlanguages.
          </p>
        </a>

        {/* <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={inter.className}>
            Templates <span>-&gt;</span>
          </h2>
          <p className={inter.className}>Explore the Next.js 13 playground.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={inter.className}>
            Deploy <span>-&gt;</span>
          </h2>
          <p className={inter.className}>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a> */}
      </div>
    </main>
  )
}
