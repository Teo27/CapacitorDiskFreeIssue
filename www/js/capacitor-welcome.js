window.customElements.define('capacitor-welcome', class extends HTMLElement {
  constructor() {
    super();

    Capacitor.Plugins.SplashScreen.hide();
    
    const root = this.attachShadow({ mode: 'open' });

    root.innerHTML = `
    <style>
      :host {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        display: block;
        width: 100%;
        height: 100%;
      }
      .button {
        display: inline-block;
        padding: 10px;
        background-color: #73B5F6;
        color: #fff;
        font-size: 0.9em;
        border: 0;
        border-radius: 3px;
        text-decoration: none;
        cursor: pointer;
      }
      main {
        padding: 15px;
      }
      main p {
        color: #333;
      }
      main pre {
        white-space: pre-line;
      }
    </style>
    <div>
      <main>
        <button class="button" id="get-size">Get Size</button>
        <h3>
          diskFree:
        </h3>
        <p id="diskFreeRaw"></p>
        <h3>
          diskTotal:
        </h3>
        <p id="diskTotalRaw"></p>
        <h3>
          User Friendly diskFree:
        </h3>
        <p id="diskFree"></p>
        <h3>
          User Friendly diskTotal:
        </h3>
        <p id="diskTotal"></p>
      </main>
    </div>
    `
  }

  connectedCallback() {
    const self = this;

    self.shadowRoot.querySelector('#get-size').addEventListener('click', async function() {
      const { Device } = Capacitor.Plugins;

      Capacitor.Plugins.Device.getInfo()

      try {
        const deviceInfo = await Device.getInfo({
          resultType: "uri"
        });
        console.log(deviceInfo)

        const diskFreeRaw = self.shadowRoot.querySelector('#diskFreeRaw');
        const diskTotalRaw = self.shadowRoot.querySelector('#diskTotalRaw');
        const diskFree = self.shadowRoot.querySelector('#diskFree');
        const diskTotal = self.shadowRoot.querySelector('#diskTotal');

        diskFreeRaw.innerHTML = deviceInfo.diskFree
        diskTotalRaw.innerHTML = deviceInfo.diskTotal
        diskFree.innerHTML = calculateSize(deviceInfo.diskFree)
        diskTotal.innerHTML = calculateSize(deviceInfo.diskTotal)
        
        
      } catch (e) {
        console.warn('User cancelled', e);
      }
    })
  }
});

function calculateSize(bytes) {
  if (bytes < 1) return null
  let txt = "";
  const units = ["bytes", "kilobytes", "megabytes", "gigabytes", "terabytes"]


  for (const [index, unit] of units.entries()) {
    const divisor = Math.pow(1024, index)
    if (divisor <= bytes) {
      txt += `${unit}: ${Number((bytes / divisor).toFixed(2))}<br>`
    } else {
      break
    }
  }

  return txt
}

function getDeviceData(){
  
}