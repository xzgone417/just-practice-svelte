<script lang="ts">
  import { fade } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  import { t, locale } from "../lib/i18n";
  export let agreementProps: any = {};
  export let isLogoutAgreementCondition = false;
  export let isLogoutAgreementRead = false;
  const dispatch = createEventDispatcher();
</script>

<!-- todo 隐私协议 -->
{#if agreementProps.isPrivacyPolicy}
  <div
    class="container container-bind"
    transition:fade={{ delay: 250, duration: 300 }}
  >
    <div class="image-container image-switch">
      <img
        src={agreementProps.png64.sofish_image}
        class="sofish-image"
        alt=""
      />
      <div
        class="close-image-btn"
        role="button"
        on:keydown={() => {}}
        tabindex="0"
        on:click={() => {
          dispatch("closePrivacyPolicy");
        }}
      >
        <img
          src={agreementProps.png64.close_image}
          class="close-image"
          alt=""
        />
      </div>
    </div>
    <div class="account-bind">
      <button
        type="button"
        class="account-bind-button google-button"
        on:click={() => {
          dispatch("openPrivacyPolicy");
        }}>{$t("sf_protocol_privacy")}</button
      >
    </div>
    <div class="account-bind">
      <button
        type="button"
        class="account-bind-button google-button"
        on:click={() => {
          dispatch("openPrivacyPolicyUer");
        }}>{$t("sf_protocol_user")}</button
      >
    </div>
  </div>
{/if}

<!--  todo 游戏账号注销协议-->
{#if agreementProps.showLogoutAgreement}
  <div
    class="container container-logout"
    transition:fade={{ delay: 250, duration: 300 }}
  >
    <div class="logout-agreement-top">
      <div class="logout-agreement-title">
        {agreementProps.logoutAgreementTitle}
      </div>
      <div
        class="close-image-btn"
        role="button"
        on:keydown={() => {}}
        tabindex="0"
        on:click={() => {
          dispatch("closeLogoutAgreement");
        }}
      >
        <img
          src={agreementProps.png64.close_image}
          class="close-image"
          alt=""
        />
      </div>
    </div>
    {#if agreementProps.logoutAgreementStatus === 0}
      <div class="logout-agreement-content">
        <div class="logout-agreement-text">
          {@html $t("sf_cancel_account_conditions_content")}
        </div>
        <div class="logout-agreement-label">
          <label>
            <div>
              <input
                type="checkbox"
                bind:checked={isLogoutAgreementCondition}
                class="logout-agreement-option-key"
              />
              <span class="logout-agreement-option-value"
                >{$t("sf_cancel_account_conditions_meet")}</span
              >
            </div>
          </label>
        </div>
        <div class="logout-btns">
          <button
            class="logout-btn"
            on:click={() => {
              agreementProps.logoutAgreementTitle = $t(
                "sf_cancel_account_agreement_title"
              );
              agreementProps.logoutAgreementStatus = 1;
            }}
            style="background-color: {agreementProps.isLogoutAgreementCondition
              ? '#ff4332'
              : 'rgb(255, 159, 153)'};"
            disabled={!agreementProps.isLogoutAgreementCondition}
            >{$t("sf_action_next")}</button
          >
        </div>
      </div>
    {:else if agreementProps.logoutAgreementStatus === 1}
      <div class="logout-agreement-content">
        <div class="logout-agreement-text">
          {@html $t("sf_cancel_account_agreement_content")}
        </div>
        <div class="logout-agreement-label">
          <label>
            <div>
              <input
                type="checkbox"
                bind:checked={isLogoutAgreementRead}
                class="logout-agreement-option-key"
              />
              <span class="logout-agreement-option-value"
                >{$t("sf_cancel_account_agreement_agree")}<a
                  href="#top"
                  on:click|preventDefault={() => {
                    agreementProps.logoutAgreementTitle = $t(
                      "sf_cancel_account_protocol"
                    );
                    agreementProps.logoutAgreementStatus = 3;
                  }}>{$t("sf_cancel_account_protocol")}</a
                ></span
              >
            </div>
          </label>
        </div>
        <div class="logout-btns">
          <button
            class="logout-btn"
            on:click={() => {
              agreementProps.logoutAgreementTitle = $t(
                "sf_cancel_account_notice_title"
              );
              agreementProps.logoutAgreementStatus = 2;
            }}
            style="background-color: {agreementProps.isLogoutAgreementRead
              ? '#ff4332'
              : 'rgb(255, 159, 153)'};"
            disabled={!agreementProps.isLogoutAgreementRead}
            >{$t("sf_action_next")}</button
          >
        </div>
      </div>
    {:else if agreementProps.logoutAgreementStatus === 2}
      <div class="logout-agreement-content">
        <div class="logout-agreement-text">
          {@html $t("sf_cancel_account_notice_content")}
        </div>
        <div class="logout-need-btns">
          <button
            class="logout-cancel-need-btn"
            on:click={() => {
              dispatch("closeLogoutAgreement");
            }}
            disabled={!agreementProps.isLogoutAgreementRead}
            >{$t("sf_cancel_account_notice_giveup")}</button
          >
          <button
            class="logout-confirm-need-btn"
            on:click={() => {
              dispatch("closeLogoutAgreement");
            }}
            disabled={!agreementProps.isLogoutAgreementRead}
            >{$t("sf_cancel_account_notice_agree")}</button
          >
        </div>
      </div>
    {:else}
      <div class="logout-agreement-content">
        <div class="logout-agreement-text">
          {@html $t("sf_cancel_account_protocol_content")}
        </div>
        <div class="logout-btns">
          <button
            class="logout-btn"
            on:click={() => {
              agreementProps.logoutAgreementTitle = $t(
                "sf_cancel_account_agreement_title"
              );
              agreementProps.logoutAgreementStatus = 1;
            }}>{$t("sf_action_confirm")}</button
          >
        </div>
      </div>
    {/if}
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
        cursor: pointer;
        width: 100%;
        padding: 10px;
        margin-bottom: 10px;
        border: 1px solid #ccc;
        box-sizing: border-box;
        border-radius: 50px;
        flex: 1;
        padding-left: 35px;
      }

      .google-button {
        background-color: white;
        color: #029cffff;
        border: solid 1px #029cffff;
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

    label {
      display: block;
      margin-bottom: 5px;
    }
  }
  .container-logout {
    z-index: 60;
    height: auto;
    transform: translateX(-50%) translateY(-50%);
    position: fixed;
    top: 50%;
    left: 50%;
    width: 80vw;
    min-width: 236px;
    max-width: 400px; /* 限制表单最大宽度 */
    background-color: #f4f4f4;
    padding: 20px;
    border-radius: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    .logout-agreement-top {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      margin-bottom: 10px;
      height: 19%;
      padding-bottom: 10px;
      border-bottom: 1px solid #d7d7d7;
      .logout-agreement-title {
        font-size: 18px;
        font-weight: 600;
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
    }
    .logout-agreement-content {
      .logout-agreement-text {
        // text-align: center;
        max-height: 60vh;
        overflow-y: scroll;
        margin: 10px;
      }
      .logout-agreement-label {
        text-align: center;
        margin: 20px 0;
        .logout-agreement-option-key {
          width: 15px;
          height: 15px;
          margin-right: 6px;
        }
      }

      .logout-btns {
        text-align: center;
        .logout-btn {
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
            background-color: #a09c9c; /* 鼠标悬停时颜色变深 */
          }
          &:active {
            background-color: #990000; /* 按下按钮时 */
          }
        }
      }
      .logout-need-btns {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 20px 10px 10px 10px;
        .logout-cancel-need-btn {
          background-color: #fff;
          color: #ff4332;
          border: 1px solid #ff4332;
          width: 44%;
          box-sizing: border-box;
          padding: 12px 0;
          border-radius: 26px;
          text-align: center;
          cursor: pointer;
          &:hover {
            background-color: #eeeeee; /* 鼠标悬停时颜色变深 */
          }
          &:active {
            background-color: #eeeeee;
          }
        }
        .logout-confirm-need-btn {
          background-color: #ff4332;
          width: 44%;
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
            background-color: #cc0000; /* 鼠标悬停时颜色变深 */
          }
        }
      }
    }
  }
  .container-bind {
    z-index: 50;
    height: auto;
    min-height: 250px;
    transform: translateX(-50%) translateY(-50%);
  }

  @media screen and (max-width: 600px) {
    .container {
      max-width: 90%;
    }
  }
</style>
