<script>
 import { initTurboClient } from "./src/TurboClient.svelte";
 import Button from "./c/Button.svelte";
 import Card from "./c/Card.svelte";

 import * as db from "./graphql-codegen.svelte";

 initTurboClient();

 const listCardsFull = db.listCardsFullQuery();
 const addCard = db.addCardMutation();
 const deleteCard = db.deleteCardMutation();
 const updateCard = db.updateCardMutation();
 const cardStream = db.cardStreamSubscription((messages = [], data) => [
  data.cardStream,
  ...messages,
 ]);
</script>

<!-- {#if !$cardStream.data}
 <p>No new messages</p>
{:else}
 <ul>
  {#each $cardStream.data as message}
   <li>{JSON.stringify(message)}</li>
  {/each}
 </ul>
{/if} -->

<Button>Do Nothing</Button>

<Button
 on:click={() => {
  addCard({ content: 'NEW CARD' });
  $listCardsFull.context = { requestPolicy: 'cache-and-network', forceUpdate: Date.now() };
 }}>
 Add Card
</Button>

{#if $listCardsFull.fetching}
 <p>Loading...</p>
{:else if $listCardsFull.error}
 <p>Oh no... {$listCardsFull.error.message}</p>
{:else}
 <ul class="p-4 grid grid-cols-1 gap-6 lg:grid-cols-2">
  {#each $listCardsFull.data.listCardsFull as card (card.rowid)}
   <Card
    {card}
    on:change={(newContent) => {
     console.log('newcontent: ', newContent.detail);
     updateCard({ rowid: card.rowid, content: newContent.detail });
    }}
    on:delete={(event) => {
     deleteCard({ rowid: event.detail.rowid });
     $listCardsFull.context = { requestPolicy: 'cache-and-network', forceUpdate: Date.now() };

     // alert(`AAAHHHHHHHH ${event.detail.rowid}`);
    }} />
  {/each}
 </ul>
{/if}
