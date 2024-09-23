<script lang="ts">
  import { fade } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  import { t, locale } from "../lib/i18n";
  export let dialogProps: any = {};
  const dispatch = createEventDispatcher();
</script>

<!-- todo facebook解绑 -->
{#if dialogProps.showUnbindFacebook}
  <div
    class="container container-login"
    transition:fade={{ delay: 250, duration: 300 }}
  >
    <div class="image-container image-logoff">
      <div
        class="back-image-btn"
        role="button"
        on:keydown={() => {}}
        tabindex="0"
        on:click={() => {
          dispatch("leftUnbindFacebook");
        }}
      >
        <img src={dialogProps.png64.back_image} class="back-image" alt="<" />
      </div>
      <img src={dialogProps.png64.sofish_image} class="sofish-image" alt="" />
    </div>
    <div class="unbind-content">
      <div class="unbind-description">{$t("other.unbind_facebook")}</div>
      <div class="unbind-code">
        Facebook：{dialogProps.facebookUserInfo.loginName
          ? dialogProps.facebookUserInfo.loginName
          : ""}
      </div>
      <div class="unbind-btns">
        <button
          class="unbind-btn"
          on:click={() => {
            dispatch("whereBindFacebook", 0);
          }}>{$t("other.unbind_facebook")}</button
        >
      </div>
    </div>
  </div>
{/if}
<!--  todo 谷歌绑定-->
{#if dialogProps.showGoogleBind}
  <div
    class="container container-login"
    transition:fade={{ delay: 250, duration: 300 }}
  >
    <div class="image-container image-logoff">
      <div
        class="back-image-btn"
        role="button"
        on:keydown={() => {}}
        tabindex="0"
        on:click={() => {
          dispatch("closeTheGoogleBind");
        }}
      >
        <img src={dialogProps.png64.back_image} class="back-image" alt="<" />
      </div>
      <img src={dialogProps.png64.sofish_image} class="sofish-image" alt="" />
    </div>
    <div class="googlebind-content">
      <div class="googlebind-description">
        {$t("sf_link_with_google")}
      </div>
      <div class="google-binding">
        <slot name="bindGoogle"></slot>
      </div>
    </div>
  </div>
{/if}

<!-- todo 谷歌解绑 -->
{#if dialogProps.showUnbindGoogle}
  <div
    class="container container-login"
    transition:fade={{ delay: 250, duration: 300 }}
  >
    <div class="image-container image-logoff">
      <div
        class="back-image-btn"
        role="button"
        on:keydown={() => {}}
        tabindex="0"
        on:click={() => {
          dispatch("leftUnbindGoogle");
        }}
      >
        <img src={dialogProps.png64.back_image} class="back-image" alt="<" />
      </div>
      <img src={dialogProps.png64.sofish_image} class="sofish-image" alt="" />
    </div>
    <div class="unbind-content">
      <div class="unbind-description">{$t("other.unbind_google")}</div>
      <div class="unbind-code">
        Google：{dialogProps.googleUserInfo
          ? dialogProps.googleUserInfo.loginName
          : ""}
      </div>
      <div class="unbind-btns">
        <div class="google-binding">
          <slot name="unbindGoogle"></slot>
        </div>
      </div>
    </div>
  </div>
{/if}
<!--  todo 查看礼包信息-->
{#if dialogProps.showGiftBagInfo}
  <div
    class="container container-login"
    transition:fade={{ delay: 250, duration: 300 }}
  >
    <div class="image-container image-logoff">
      <span style="font-size:18px">{dialogProps.giftBagInfo.giftname}</span>
      <div
        class="close-image-btn"
        role="button"
        on:keydown={() => {}}
        tabindex="0"
        on:click={() => {
          dispatch("closeGiftBagInfo");
        }}
      >
        <img src={dialogProps.png64.close_image} class="close-image" alt="X" />
      </div>
    </div>
    <div class="gift-bag-dialog-content">
      <div class="gift-bag-dialog-description">
        {dialogProps.giftBagInfo.description}
      </div>
      <div class="gift-bag-dialog-inputs">
        <div class="gift-bag-dialog-code">
          {$t("sf_gift_exchange")}
          {dialogProps.giftBagInfo.code}
        </div>
        <div class="gift-bag-dialog-btns">
          <button
            class="gift-bag-dialog-copy"
            on:click={() => () => {
              dispatch("eCopyToClipboard", dialogProps.giftBagInfo.code);
            }}>{$t("sf_action_copy")}</button
          >
        </div>
      </div>
    </div>
  </div>
{/if}

<style lang="less">
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
    // 礼包弹框信息
    .gift-bag-dialog-content {
      .gift-bag-dialog-description {
        text-align: center;
        margin: 30px 10px 10px 10px;
        height: 40px;
        line-height: 40px;
      }

      .gift-bag-dialog-inputs {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 40px;
        line-height: 40px;

        .gift-bag-dialog-code {
          width: 70%;
          border: 1px solid #a4ada4;
          padding: 5px 5px;
          height: 30px;
          line-height: 30px;
          border-radius: 5px;
        }

        .gift-bag-dialog-btns {
          width: 30%;
          text-align: center;

          .gift-bag-dialog-copy {
            background-color: #ff4332;
            color: white;
            padding: 10px 25px;
            border-radius: 5px;
            text-align: center;
            border: none;
            cursor: pointer;
          }
        }
      }
    }

    // 解绑Facebook
    .unbind-content {
      .unbind-description {
        text-align: center;
        margin: 10px;
        height: 40px;
        line-height: 40px;
      }

      .unbind-code {
        text-align: center;
        height: 40px;
        line-height: 40px;
        margin-bottom: 20px;
      }

      .unbind-btns {
        text-align: center;

        .unbind-btn {
          background-color: #ff4332;
          color: white;
          padding: 10px 25px;
          border-radius: 5px;
          text-align: center;
          border: none;
          cursor: pointer;
        }
      }
    }

    // 谷歌绑定
    .googlebind-content {
      padding-bottom: 10px;

      .googlebind-description {
        text-align: center;
        margin: 10px;
        height: 40px;
        line-height: 40px;
      }
    }

    .google-binding {
      display: flex;
      justify-content: center;
    }

    .image-container {
      display: flex;
      align-items: center;
      width: 100%;
      // margin-bottom: 20px;
      justify-content: center;

      .back-image-btn {
        position: absolute;
        width: 12px;
        height: 20px;
        padding-left: 10px;
        left: 10px;
        background-size: contain;
        cursor: pointer;
      }
      .back-image {
        width: 100%;
        height: 100%;
      }

      .close-image-btn {
        position: absolute;
        width: 20px;
        height: 20px;
        padding-right: 10px;
        right: 10px;
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

    .image-logoff {
      margin-bottom: 10px;
      height: 19%;
    }
  }

  .container-login {
    z-index: 60;
    height: auto;
    transform: translateX(-50%) translateY(-50%);
  }

  /* 响应式布局 */
  @media (max-width: 600px) {
    .container {
      max-width: 90%;
      /* 在小屏幕上增加表单宽度 */
    }
  }
</style>
