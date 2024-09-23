<script lang="ts">
  import { fade } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  import { t, locale } from "../lib/i18n";
  export let customerProps: any = {};
  const dispatch = createEventDispatcher();
  let communityBtnList = [] as any[];
  $: {
    if (customerProps.communityFacebook) {
      communityBtnList[0] = {
        name: "Facebook",
        icon: customerProps.png64.fb_icon2,
        link: customerProps.communityFacebook,
      };
    }
    if (customerProps.communityDiscord) {
      communityBtnList[1] = {
        name: "Discord",
        icon: customerProps.png64.robot_icon,
        link: customerProps.communityDiscord,
      };
    }
    communityBtnList = communityBtnList;
  }
</script>

<!-- todo 客服中心服务-->
{#if customerProps.isCustomerService}
  <div
    class="container container-bind"
    transition:fade={{ delay: 250, duration: 300 }}
  >
    <div class="image-container image-switch">
      <img src={customerProps.png64.sofish_image} class="sofish-image" alt="" />
      <div
        class="close-image-btn"
        role="button"
        on:keydown={() => {}}
        tabindex="0"
        on:click={() => {
          dispatch("closeCustomerService");
        }}
      >
        <img
          src={customerProps.png64.close_image}
          class="close-image"
          alt="X"
        />
      </div>
    </div>
    {#each communityBtnList as item, index}
      <div class="account-bind">
        <button
          type="button"
          class="account-bind-button google-button"
          on:click={() => {
            dispatch("openCommunity", { name: item.link });
          }}>{item.name}</button
        >
        <img src={item.icon} class="input-left-icon input-user-icon" alt="" />
      </div>
    {/each}

    <!-- <div class="account-bind">
      <button
        type="button"
        class="account-bind-button google-button"
        on:click={() => {
          dispatch("openDiscord");
        }}>Discord</button
      >
      <img
        src={customerProps.png64.robot_icon}
        class="input-left-icon input-user-icon"
        alt=""
      />
    </div> -->
    <div class="account-bind">
      <button
        type="button"
        class="account-bind-button google-button"
        on:click={() => {
          dispatch("openFAQ");
        }}>{$t("sf_user_customer_service")}</button
      >
      <img
        class="input-left-icon input-user-icon"
        src={customerProps.png64.customer_icon}
        alt=""
      />
    </div>
  </div>
{/if}

{#if customerProps.showCustomerServiceFAQ}
  <div
    class="container container-FAQ"
    transition:fade={{ delay: 250, duration: 300 }}
  >
    <div class="image-container image-logoff">
      <img src={customerProps.png64.sofish_image} class="sofish-image" alt="" />
      <div
        class="close-image-btn"
        role="button"
        on:keydown={() => {}}
        tabindex="0"
        on:click={() => {
          dispatch("closeFAQ");
        }}
      >
        <img
          src={customerProps.png64.close_image}
          class="close-image"
          alt="X"
        />
      </div>
    </div>
    <div class="FAQ-content">
      <div class="chat">
        <img src={customerProps.png64.customer_icon} class="FAQ-icon" alt="" />
        <div class="chat-bubble">
          {#each customerProps.customerServiceFaqList as item, index}
            <div
              style="color:{item.isOpen ? 'red' : 'black'}"
              class="chat-text"
              on:click={() => {
                if (item.desc && item.desc.length > 0) {
                  customerProps.customerServiceFaqReply.push(item);
                  customerProps.customerServiceFaqReply =
                    customerProps.customerServiceFaqReply;
                  item.isOpen = true;
                } else {
                  item.isOpen = !item.isOpen;
                }
              }}
              role="button"
              on:keydown={() => {}}
              tabindex="0"
            >
              {item.name}
            </div>
            {#if item.isOpen && !(item.desc && item.desc.length > 0)}
              {#each item.sub as subItem}
                <div
                  class="chat-in-text"
                  style="color:{subItem.isOpen ? 'red' : 'black'}"
                  on:click|preventDefault={() => {
                    subItem.isOpen = true;
                    customerProps.customerServiceFaqReply.push(subItem);
                    customerProps.customerServiceFaqReply =
                      customerProps.customerServiceFaqReply;
                  }}
                  role="button"
                  on:keydown={() => {}}
                  tabindex="0"
                >
                  {subItem.name}
                </div>
              {/each}
            {/if}
          {/each}
        </div>
      </div>
      {#each customerProps.customerServiceFaqReply as item}
        <div class="chat">
          <img
            class="FAQ-icon"
            src={customerProps.png64.customer_icon}
            alt=""
          />
          <div class="chat-bubble">
            <div style="color:red;margin:6px;">{item.name}</div>
            <div>{item.desc}</div>
          </div>
        </div>
      {/each}
    </div>
    <div class="FAQ-btns">
      <button
        class="FAQ-btn"
        on:click={() => {
          dispatch("contactCustomer");
        }}>{$t("sf_user_contact_service")}</button
      >
    </div>
  </div>
{/if}

<style lang="less">
  /* 表单容器样式 */
  .container {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 80vw;
    min-width: 260px;
    background-color: #f4f4f4;
    padding: 20px;
    border-radius: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: start;

    .account-bind {
      display: flex;
      align-items: center;
      position: relative;
      margin-bottom: 10px;
      .account-bind-button {
        width: 100%;
        padding: 10px;
        margin-bottom: 10px;
        border: 1px solid #ccc;
        box-sizing: border-box;
        border-radius: 50px;
        flex: 1;
        padding-left: 35px;
        cursor: pointer;
      }
      .google-button {
        background-color: white;
        color: #029cffff;
        border: solid 1px #029cffff;
      }
      .input-left-icon {
        position: absolute;
        left: 3%;
        top: 41%;
        margin-right: 10px;
        background-size: contain;
        background-repeat: no-repeat;
      }
      .input-user-icon {
        transform: translateY(-56%);
        width: 30px;
        height: 30px;
      }
    }

    .image-container {
      display: flex;
      align-items: center;
      width: 100%;
      justify-content: center;

      .close-image-btn {
        position: absolute;
        width: 20px;
        height: 20px;
        padding-right: 10px;
        right: 5%;
        background-size: contain;
        cursor: pointer;
      }
      .close-image {
        width: 100%;
        height: 100%;
      }
      .sofish-image {
        display: flex;
        width: 50%;
        max-width: 240px;
        aspect-ratio: 24/5;
        text-align: center;
        align-items: center;
        justify-content: center;
      }
    }

    .image-switch {
      margin-bottom: 3.5vh;
      height: 24%;
    }
    .image-logoff {
      margin-bottom: 10px;
      height: 19%;
    }
  }

  .container-bind {
    z-index: 50;
    height: auto;
    // min-height: 250px;
    transform: translateX(-50%) translateY(-50%);
  }
  .container-FAQ {
    z-index: 60;
    height: auto;
    transform: translateX(-50%) translateY(-50%);
    position: fixed;
    top: 50%;
    left: 50%;
    width: 80vw;
    // min-width: 236px;
    background-color: #f5f5f5;
    padding: 20px;
    border-radius: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    .FAQ-content {
      min-height: 50vh;
      max-height: 70vh;
      overflow-y: scroll;
      margin-top: 20px;
      position: relative;
      .chat {
        display: flex;
        justify-content: flex-start;
        margin-bottom: 20px;
        margin-left: 16px;
        .FAQ-icon {
          transform: translate(-50%, 50%);
          width: 30px;
          height: 30px;
        }
        .chat-bubble {
          position: relative;
          background-color: #ffffff;
          padding: 10px 15px;
          border-radius: 10px;
          margin: 10px 0;
          max-width: 70%;
          .chat-text {
            cursor: pointer;
            padding: 3px 0;
          }
          .chat-in-text {
            cursor: pointer;
            padding: 3px 0;
            margin-left: 10px;
          }
        }
        .chat-bubble::after {
          content: "";
          position: absolute;
          top: 10%;
          left: -20px;
          /* 气泡尖角的位置 */
          border-width: 10px 10px;
          border-style: solid;
          border-color: #ffffff transparent transparent;
          transform: rotate(90deg);
        }
      }
    }
    .FAQ-btns {
      margin-top: 20px;
      text-align: center;
      .FAQ-btn {
        background-color: #ff4332;
        width: 90%;
        box-sizing: border-box;
        color: white;
        padding: 12px 0;
        border-radius: 26px;
        text-align: center;
        border: none;
        cursor: pointer;
        &:hover {
          background-color: #cc0000; /* 鼠标悬停时颜色变深 */
        }
        &:active {
          background-color: #990000; /* 按下按钮时 */
        }
      }
    }
  }

  @media screen and (max-width: 600px) {
    .container {
      max-width: 90%;
    }
  }
</style>
