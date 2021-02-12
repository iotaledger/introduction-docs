<svelte:options tag="send-message-demo" />

<script lang="ts">
  console.log("hello !!!");
  // Import Iota from '@iota/iota.js/dist/iota.browser.js';
  // import * as IOTA from 'iota/iota.js/dist/iota.browser.js'
  // import * as IOTA from '@iota/iot a.js'
  // import {SingleNodeClient} from '@iota/iota.js'

  let state = { loading: false };

  async function send() {
    state.loading = !state.loading;

    console.log("sending...");


    // const client = new SingleNodeClient("http://localhost:14265");

    // const info = await client.info();
    // console.log("Node Info");
    // console.log("\tName:", info.name);
    // console.log("\tVersion:", info.version);
    // console.log("\tIs Healthy:", info.isHealthy);
    // console.log("\tNetwork Id:", info.networkId);
    // console.log("\tLatest Milestone Index:", info.latestMilestoneIndex);
    // console.log("\tSolid Milestone Index:", info.solidMilestoneIndex);
    // console.log("\tPruning Index:", info.pruningIndex);
    // console.log("\tFeatures:", info.features);
    // console.log("\tMin PoW Score:", info.minPowScore);

  }
</script>

<style>

</style>

<div>
  {#if state.loading}
    <button on:click={send}>Log out</button>
  {/if}

  {#if !state.loading}
    <button on:click={send}>Log in</button>
  {/if}
</div>
