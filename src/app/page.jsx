import styles from './home.module.css';

const Home = () => {
  const features = [
    {
      id: 1,
      title: "Static Analyze Engine",
      description: "CodeQL, Analyzing your code for potential vulnerabilities",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADRUlEQVR4nO2ZXUhTYRjHd2NBXmRBOY0uAi/Cry7SCAoKvFDaaEcMIaKuIshItCD0bGhJo/xgOT9Qd/yEIggio8tIUgTvDMq1mZrbzEmeTbfO5uZZ2z/OlmAqbMcdz9HYA384sJvf77zP877nZTJZohKVqP+/ihegIOz4QdiBeJPfPTsquoDKjjkh4Llkaj6LL0EIBM8lS/0lItFjGduzAqJLEAIKZKsnxJcgBBTIISfElyDWAajmQzhQZUBSRWvUJFdTWwqILkEIKJBLGsWXIARsoVOkUXwJQkCB09qpqBJn+q2ju1agcIwRX4IQcAb4RJYQ2IEWknwFiIQAoLIFoJz2QGFehsLowKUJOvysnPGGf9vxFUiuomIa4k0p12NfWQNydS9wc/gT6ucd6PKxMKwG0cywIBcY3Jh2QmFaCovsnED1NgTu6nBM0wnNpAUDIaA/GEnfb6CXSwDoCQAUC2idfpSY6N0zA5dnfbg+5UB3IBgV3rAKdPoBvTeIlhWck1yAa4VSM80LvsMPtPuANi/cbT5kSCqgNC+jye3nD78CtHiBZg9GpBvicj0O3WvDyceDyKh7jRMPX+F4zUuka57jKDmAw1W9OPiAQvL9TuyvbEcKSf0Dr/cAz5hwLkozxHeakNPwJmaBpIrWTfA6Bmh0gxJUINZwe/v5jg+8VqBlA3zTL6DRBbM0AkYHqECIV8/rN8K7gacuuCUT6GJDccHXu4AnS2CkGeLbDaiz/owXHlonvko2xNk8hjiFpLaCR50DXYIK8DnECoZneO1CjZvhUUsLvI3yPcgu9I7EJHCQpLaC/xgXfLwC3CpcMdHhbxsePQ8OXm1n2YL31luSCqx9zF0109B5gjHDk/YAzr41I29omc0cXKyVVCAsYfGjxOxAzaI/KnzlnB+FY3PIG1pi84fdyHpHB9MMVpWkAmvtxJ3O1745UWFjULvIQusM4hEdhHqBRdl3BqUmJxSTrvCNjXvzHHx6tw1yg2011WBRSiqwXoS7PipiuFLKKVuR3GDzpVERiW2thNACsUb2t+KWEPIvJh6xrmeIS6LYjiLCDpuY8Kp5FG7k4GYgDB+RGJftxUqNSIwf6ZuVS82SqETJdkH9AdnZeR4MKdrlAAAAAElFTkSuQmCC",
    },
    {
      id: 2,
      title: "LLM AI Patch",
      description: "Zero Shot Prompting, Recognizing or predicting a class even though it has not seen it directly in the training data",
      icon: "data:image/png;base64,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",
    },
    {
      id: 3,
      title: "Comprehensive Issue Management Dashboard",
      description: "Offering defail explanation of vulnerabilities, severity, CWE information,fault location",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEdElEQVR4nO1bTYgcVRB+KooQJYJocspM1Swouah41EsEIQcRQTBgBL34g6igHrx6UIigXnPytAkGowEPMcgeJlPV8Qeigqx6UMjBqeqsSfbsbaRmu9fenu7pNzvd6e6lPyjYfvP6ddX36tWr7lfrXIcOHQoxmdwKpC8gy3ttENPVTSa3uLIAW8b/Cqwn2iBTXQM5Xh4BLO+buJo9cHtmC65L1xcSA8Z/71aW8cB4ZguvOwKkOg+oBebWgRxHlucjl597XYkHIOta3dHdX3StAg/QYIEo/INJjTtBsGsCesMr9wxYX4nZ/J8A/wGB9SMTVxOS+sZ2TG1a29xfaDyQ/IUsqzGb6QHLIAC+v3pgEIyPAenbU2F5Mv7tgeDa3Zk3pbc+711r2ytXp7bNIwFZX7WOycwvPeAyBKxcHD8CLBeA9DqynEWWT5DlUyB93YxC0q+B9V8kPX14uHHXjjFTW92WvtkZYNoD4nYkPdUnebmQOUhkfrOMFu/zWQQgyVvIoqbAo5cnt6ef3Q/GTyPpLwe+Dfch6WdA+l2ShJznZGaA6T7e+QHkJC3LEmDGA8k6shzKfPB01vSnAckz8fWUBNbP5+mWsQNkGuqdjIEHAT5IEmBubzOfa3w0+8D6c3Jt94ZX7kTSPwakRxfwgMw8oFYCgOXC3HWXnv0EzCAgOZ+nW94bYKUEwAJLwKK9BbysNT9/9jcO4ih8CUiGQHIyT7e8N8DGEDAIxscs2hfNPoz0WWR5HFk/nF6TXgfSMzarMXkeMeDmEOCDbQ9gfRdJPs7tR+FTyDpB1k0zHFk+QJLH3BeT2+z3FdL74tjh4QFb7wVtIqDPfz+ErC+ay2f9HuUI7+Tp5pMHNGEJfOlL3Iw+pOf6HD63TB5QexBE0huH19fvWNR4u8eWBl4K7291HgAk31iKvSgBlh7HW2Cr84CVKBHqX9Ke7/2HRiEgyVWLEfN0a3we4CIMSN4Elt96w7DvZTzL73ZPkW6NzwNcAmYQsoQY6GtZMcHazO1t5oHlDR/dGp8HuBR6wfjhaUwgvQEkX9k2F21156a5AMn5pNsXvQ43Pg9wObDInvwgYltdHO1zkf4QOvf5DVwCNxMdAdyUJTDZeaiaPsqqqr0xBEDqUDV9lFVZe1NiAHgqUlf7DDoCuJolMPOyUnV7U2KAi/bumWSl4vbmEFATyieAZlytSC5GUtcJ8Y4SmaUJcClXa7qk0+XlCWg5OgJ4UQ+ghdd802Wxw1HXsjXvGxP8CWgLcuoFfc8LWk9AXr2g73nBniVg1zFgsFUcteragpx6wbwYUFgi04uLpEhPNSBylyukp4H0z8JKMVzb3G8s1R25yxazqdD4KjGvSGKZvq0BkGzYeX9Rvwd/HN8LLP+4vQSISmW8+7Nes3vcXsEgCI8gy8i3v/XFUfiEayN6qVrjSM5GJTBeERtYL1thRbLNq9a3bvQyao1LzOeLa33rBsa1xlWNX5TI1A2oOJVufKoO1X9HKPff4UpHxd8RfI7GO3To4BbBfxrx0DPAtjGbAAAAAElFTkSuQmCC",
    },
    {
      id: 4,
      title: "Retrieval Augmented Generation",
      description: "RAG, Improves the accuracy and reliability of the generated AI model with information from external sources, filling in the gaps in how LLM works",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABs0lEQVR4nO2aPUvDUBSGoyCIqIsiCGJ7T0sVHRz6F1z9C46OCiK4Oro6OLj6FxwdQu/bgoKuQicRe06x6iIiomgk0LS1grQ1NU17HrhLPi558p5zc4c4jhJzCJwjSJEsby7k7yeC48aWMgQ+JPAzQbyuDisIQaQ+obH8ZCAHCbecDM6nzx4mCbxFVm66KeOEKVJ/Q/xB4BOD0mrtQs8bNiitGUg+PiJoSAlymYKsZy+8keCeFCRL4GMDfo+NCNUGlw14b/G8NBXcO5+rzPrHyMpjjEQkSOjVTyOF8nIwx5J7N56CbBD4KjYiVO+jT4Kc+n3jeN5QQx+t+v1VPe/1vsj3UfRXttkLHgvmTeJ2xUCOyMpLnESqZccVA9lPu7dztfkL5RkC75IV7qrIf5Fwr0eNlW1j+S3WIgFJyE5HIgZSCLN8/roNybg83ZFI5AL4+bAqQj2QBmkiVaJOgTSRJgYmESdEVASaiGhp/Yb2CLRHpP++I6QioomQlhZ0r9UWumpZsbFcfjtiYEScEFGRVoi6nEh7pImoUyBNpImoUyBNpIm+ScR06ZeLtodtYT+lOL3LFyyqg3/90HXHAAAAAElFTkSuQmCC",
    },
    {
      id: 5,
      title: "International standards and certification",
      description: "Using of common vulnerabilities and exposures (CVE) from Node Package Manager (NPM).",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFWklEQVR4nO1Zb2wURRS/lA/6DZXd2vqhTbT4CTRgIZr4N/7DRI22NqkaQqQzeyVplVJsuVJ6CqQHRukVE62KYqKEFhQp1FqhYWb7V6FWpShorKVIAW1pKWmDDYQxb/Zmu3e97e3dbnuifcnk9mbfvvm9nTfz3v7G5ZqRGZkR++JlCTflqItlhayRMdknYXJOxuSKjAnjDZErEqbnJKTWgg7owjOueIukqMkyIhtlTE7JmDJLDYlf0gvPgo1pBz57RfONMiKVEqaXBLDU/BaWGLi+s6SDuWv6dNBwfUdJB78GnZS8Fv2eBDYQqZy9jNwwLeDlHJohIfKnAPOAr4tlf9DDEhUNUGZVN6v4doz5D4/pIOEa+jKrfuP/b1ZU9vy2HnZ/eZfuNIQY2J465Fm7ZsGbEqAWlXWytQcusM0to+y2lW287wn/CQ5WNKMDoj219Rfed+vKVuZrGWVrG4ZYetn3hhAjfhjLUeypy8j1EiZ7YICkXJUt3X5KB/TwGz/xge9a16m/+ckcAJ2F6zp5/yNv/qz3vbi9lyW5mwKzQfbAmM6gz9o1S0L0CzkQu6/WDehgyg4O89CBkChpGAoCauYAtNKvh1iSW+XPlh64oPev3j/AUvKadSccmQkRNgAeBjYCeXzLcT4Y/IaCnMyB4GdPBPVDSAknZEwr7IHPoRk8bNxq0JuH5msaYcm52pTDoNE6AM/ImLJbVjQxX/No0D2YCS2cyNVERJ+NeasUu83Sj3snAHjpkz84gHRvZ1iAkRyAtjCwFnJ2nJ5wD9aE2J1i2mIlTLdaTk5T3RCpjA68oiZDghF7dLybhOmlqDK2Vh5oSSrc1BfVDXDDtxd+YxoeVkLIf3iMpRW0c52iL8+HvX+fr0vMwkZr6L0sgdcpmLLCff1hjYr4f2jzMdsOPLjpGNdZHmYdQCuo/UvMwklLBSCvKjFlc1e1T0hModk06/3fbTuQWdXNdZ5++9ew9wFD2iptluYoJD1y+GDiCbc/G9vd63/gBnNrzth2wF1zhuvcs/5HU53H3tJyhoxpUUQHJEQ/A2W0s8/U4LziI9yg56tB2w6sqR/kOvM9R0x10I7TIox2R3YA0y5QBsNmBiG8QOf1QxdtO/Ba48WIG0Jx/XnNAUSOWpmBAVD2NY+YGkzJa2WRdKw6UK6OcJ3Ul1sj6kiI9ltZA2Px3vdls3yA6N//fQckKyGUPwUhlN/iTAhN9yL2Ng5ri3i1c4v42t5G5WgSWbX9RKZUO5zIoiklnnuv27YDGe9aKCUK2qyXElEVc5umoZjb2x9dMWcsp4G3CWe0qE5bVHML2x0rp4vrTcrp8kA5jekG1//mgwbESGLFvSHid0Ur8CHN6T5M+Qd26NQu/1RbB/BhHmsILSj9zvSj/oWPbH7Uj9Mq5CrQKkB1GAeALGyHVgEiTDahVWDzAAaQ0yoKeSYm8LoTiPhhICCbQoFCroiV2BJ7+5KKSYgtRLe4HKEWA7woGDbORFnjOLXoaRi07ACAFNSi9+Bw0Js3UIufO0bypuXXX6eTu26VrwmR5ICgFWvBKrm7IEBoPWogdyHmtbDRwMOYLsfpdUwrIC5hEKDE4U1yej2QKZf4j0d04ElBr7/Sxul1WAuCoeO2IWycpteNAlyl2J0gTwBvk/1hDw8j6INDDLMDjox3xg84srf1sHvLjwYdcMTMg0YrsK2FHjGlGI6Y5ns6mFI9fsSk7Oxj8zxaBZuoqOGOmPzTdsQ04ZAP0w2idtIP8Kxl15PwbFwO+SaIlyXMwXSRjGixhEithOhZGdHL45mUXpbwobMSpnuhJOZV5b/hmHVGZsR17cs/TKbrbjuiZ4gAAAAASUVORK5CYII=",
    },
    {
      id: 6,
      title: "Result Report",
      description: "Rendering the patch results to the user in Markdown format.",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAADS0lEQVR4nO2aX0hTURzHf+FDD8VGjz5ERIT4sj80dsmaD1omGJU9TOglQsqXRMOHQAgEH4IIH4KgkTN66CGLdFNCcqOebMwNHSqFbhVIgo1t7i6ikfPEud47a9uNsd17zl33fOELyu7uud/POffs+3AAmJiYmJiYmJiYmJiYZNQTTR/vXeP9/VH+x8CnDKrEfbEM4haTqtu+kOS5xcSELRJvAKXC34rxfKXBJXev8kQA7IFIJG1LicNVA+hd4/2lAvlTWbS9g2SFP/Olsvnr25dTRAGIHq8aQL/Msv+Z+0d6UfgafK3zQ5pGeOx01QAGZJa0r4wVMJ3I0pr5vFUBcG2VR44I3WBleSGxowoAh4bCP7vzEH1vcaKx4VFyADgNBMd23X2CcqcvCs6c6SIHwBLYQAa3D+27/wLBveeKGt/TODqLrIGNokBjw4+F2X469AgNuabQtuNSHsD44ANyAAxun+LBC210zxYFwuGlwL8cnfm/318fRKfCcTIA+mIZVDfyUnUAeIzCQK9uj+RDS/7YdRO1BL6S2wS7V3lhidJYAc3zm0JgKfxmx1V04W2U7K9A+3JK2APwA6q2B7h9JfcAbOfMCvrS2YM+X76BrrxeIvsz6KTX6CqzEgD6YrvLnnajowaAox2CAUjSbYIc7Vmk3QS5EgPrqglyJQDoqglyJQDUUBPMqQLAWDtNUB0AltppguoA4GrFegVgm1tH1pklZPaG9AfgxLs1ZPbM73oymNNVE7TNre+F1wMAV0ETFJY9CQAWjTZB81SIDACDRpvgX+HVBFCn0SZIDIBRo02QGACLBpugPfyNHABOY8bhrW9W/j8ANqnRFe7u5VoJAHbhyAnlRlehTZ7glgIrIDFBY+arDS8A8IYmqwZgi8Qb8HkbkgCKGl1ls5+yToePVA0ACx82wudt8JETEgAqfucFB3mTN+RRLDwTExMTExNTOdoPAIcAoB4AjgJAIwBYAaAJABwA0AwALQDQCgDnRJ8XLf3fKl7TLH6nSbxHo3jPenEMPBZ1HQSAY7gtA0DbH2FIuU0cGz/DAdLhzQDQQSG0nPGzmEgCMOkdAIjLjuYrcJbmKwAlJLcJnizYBLHlNkHpc2kTxN9VdRP8DTe1jg7ZK3YvAAAAAElFTkSuQmCC",
    },
    
  ];

  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>Secure Patch</h1>
        <div className={styles.desc}>
          <p>Welcome to AI_SAST! your go-to platform for code security analysis.</p>
          <p>Our service helps you identify and patch vulnerabilities in your code efficiently.</p>
          <p>Simply upload your code, and receive detailed analysis and recommendations for improvement.</p>
        </div>
      </div>
      <div className={styles.featuresContainer}>
        <h2 className={styles.featuresTitle}>Key Features</h2>
        <div className={styles.features}>
          {features.map((feature) => (
            <div key={feature.id} className={styles.feature}>
              <img src={feature.icon} alt={feature.title} className={styles.featureIcon} />
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.guideContainer}>
        <h2 className={styles.guideTitle}>Guide</h2>
        <div className={styles.guideContent}>
          <p> Here's a quick guide to get you started:</p>
          <ul>
            <li>After logging in, go to <strong>My Page</strong> where you can create new projects.</li>
            <li>Once a project is created, click on the <strong>결과 보기</strong> button to check for any vulnerabilities in your code.</li>
            <li>You can also visit our <strong>Blog</strong> section to see packages with vulnerabilities that other users have shared publicly.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;



