<script lang="ts">
  import { fade } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  import { t, locale } from "../lib/i18n";
  export let bindProps: any = {};
  export let email = "";
  export let emailOtp = "";
  export let isLogOffChecked = true;
  const dispatch = createEventDispatcher();
  //判断UserDetail信息
  function whereUserDetailBind(_accountType: number) {
    let bindFlag = false;
    let userDetail = localStorage.getItem(bindProps.userDetailKey);
    if (userDetail !== null) {
      let theUserDetail = [...JSON.parse(userDetail)];
      theUserDetail.forEach(
        (account: { accountType: any; loginName: any; name: any }) => {
          if (account.accountType == _accountType) {
            bindFlag = true;
          }
        }
      );
    }
    return bindFlag;
  }
</script>

<!--todo 邮箱绑定，注销账号 -->
{#if bindProps.isShowEmail}
  <div
    class="container container-login"
    transition:fade={{ delay: 250, duration: 300 }}
  >
    <div class="image-container image-logoff">
      {#if bindProps.isEmailBind}
        <div
          class="back-image-btn"
          role="button"
          on:keydown={() => {}}
          tabindex="0"
          on:click={() => {
            dispatch("toCloseBindEmailAccounted");
          }}
        >
          <img class="back-image" alt="<" src={bindProps.png64.back_image} />
        </div>
      {/if}
      <img src={bindProps.png64.sofish_image} class="sofish-image" alt="" />
      {#if bindProps.isLogOff}
        <div
          class="close-image-btn"
          role="button"
          on:keydown={() => {}}
          tabindex="0"
          on:click={() => {
            dispatch("closeEmail");
          }}
        >
          <img src={bindProps.png64.close_image} class="close-image" alt="X" />
        </div>
      {/if}
    </div>
    {#if bindProps.isLogOff}
      <div class="form-text form-text-red">
        {$t("sf_cancel_account_warn_tips")}
      </div>
    {/if}
    {#if bindProps.isEmailBind}
      <div class="form-text">{$t("sf_link_with_email")}</div>
    {/if}
    <div class="form-group">
      <input
        type="text"
        id="email"
        name="email"
        bind:value={email}
        autocapitalize="off"
        placeholder={$t("sf_hint_email")}
      />
      <img
        class="input-left-icon input-user-icon"
        src={bindProps.png64.email_icon}
        alt=""
      />
    </div>
    <div class="form-group">
      <input
        type="text"
        id="emailotp"
        name="emailotp"
        bind:value={emailOtp}
        autocapitalize="off"
        placeholder={$t("sf_hint_verify_code")}
      />
      <img
        class="input-left-icon input-suo-icon"
        src={bindProps.png64.passemailotp_icon}
        alt=""
      />
      {#if bindProps.emailTimeShow}
        <button
          class="input-right-icon input-button"
          style="background-color: rgb(255,67,50);color: white;"
          disabled
          type="submit">{bindProps.emailTimeCount}s</button
        >
      {:else if bindProps.isEmailBind}
        <button
          class="input-right-icon input-button"
          style="background-color: rgb(255,67,50);color: white;"
          type="submit"
          disabled={bindProps.emailTimeShow}
          on:click={() => {
            bindProps.emailTimeShow = true;
            bindProps.emailTimeCount = 60;
            dispatch("notDebounceSendEmail", {
              flag: "bind",
              email: bindProps.email,
            });
          }}>{bindProps.emailText}</button
        >
      {:else}
        <button
          class="input-right-icon input-button"
          style="background-color: rgb(255,67,50);color: white;"
          type="submit"
          disabled={bindProps.emailTimeShow}
          on:click={() => {
            bindProps.emailTimeShow = true;
            bindProps.emailTimeCount = 60;
            dispatch("notDebounceSendEmail", {
              flag: "logoff",
              email: bindProps.email,
            });
          }}>{bindProps.emailText}</button
        >
      {/if}
    </div>
    <div class="login-register">
      <!-- logoff -->
      {#if bindProps.isLogOff}
        <button
          class="register"
          style="background-color: rgb(255,67,50);color: white;"
          type="submit"
          on:click={() => {
            dispatch("submitLogOff");
          }}>{$t("sf_action_submit")}</button
        >
      {/if}
      {#if bindProps.isEmailBind}
        <button
          class="register"
          style="background-color: rgb(255,67,50);color: white;"
          type="submit"
          on:click={() => {
            dispatch("submitEmailBind");
          }}>{$t("sf_action_submit")}</button
        >
      {/if}
    </div>
    {#if bindProps.isLogOff}
      <div class="user-policy">
        <label>
          <input
            type="checkbox"
            bind:checked={isLogOffChecked}
            on:change={() => {
              dispatch("logOffCheckboxChange");
            }}
          />
          {$t("sf_cancel_account_agreement_agree")}
          <span
            ><a
              href="#top"
              on:click|preventDefault={() => {
                dispatch("toShowLogoutAgreement");
              }}>{$t("sf_cancel_account_protocol")}</a
            ></span
          >
        </label>
      </div>
    {/if}
  </div>
{/if}

<!--todo 邮箱解绑  -->
{#if bindProps.isShowBindAccounted}
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
          dispatch("closeBindAccounted");
        }}
      >
        <img class="back-image" alt="<" src={bindProps.png64.back_image} />
      </div>
      <img src={bindProps.png64.sofish_image} class="sofish-image" alt="" />
    </div>
    <div class="form-text">
      {bindProps.accountTitle}
    </div>
    <!-- 解绑邮箱 -->
    {#if bindProps.deleteEmail}
      <div class="form-group">
        <input
          type="text"
          id="emailotp"
          name="emailotp"
          bind:value={emailOtp}
          autocapitalize="off"
          placeholder={$t("sf_hint_verify_code")}
        />
        <img
          class="input-left-icon input-suo-icon"
          src={bindProps.png64.passemailotp_icon}
          alt=""
        />
        {#if bindProps.emailTimeShow}
          <button
            class="input-right-icon input-button"
            style="background-color: rgb(255,67,50);color: white;"
            disabled
            type="submit">{bindProps.emailTimeCount}s</button
          >
        {:else}
          <button
            class="input-right-icon input-button"
            style="background-color: rgb(255,67,50);color: white;"
            type="submit"
            disabled={bindProps.emailTimeShow}
            on:click={() => {
              bindProps.emailTimeShow = true;
              dispatch("notDebounceSendEmail", {
                flag: "unbind",
                email: bindProps.accountLoginName,
              });
            }}>{bindProps.emailText}</button
          >
        {/if}
      </div>
    {:else}
      <div class="form-group bind-class">
        <span>{bindProps.typeName}:</span>
        <span style="margin-left: 5px">{bindProps.accountLoginName}</span>
      </div>
    {/if}
    <div class="login-register">
      {#if bindProps.deleteEmail}
        <button
          class="register"
          style="background-color: rgb(255,67,50);color: white;"
          type="submit"
          on:click={() => {
            dispatch("deleteEmailBindAccount");
          }}>{bindProps.accountTitle}</button
        >
      {:else}
        <button
          class="register"
          style="background-color: rgb(255,67,50);color: white;"
          type="submit"
          on:click={() => {
            dispatch("deleteBindAccount", {
              theAccountType: bindProps.accountType,
            });
          }}>{bindProps.accountTitle}</button
        >
      {/if}
    </div>
  </div>
{/if}
<!-- todo 绑定账号,包括第三方脸书，谷歌 -->
{#if bindProps.isBindAccount}
  <div
    class="container container-bind"
    transition:fade={{ delay: 250, duration: 300 }}
  >
    <div class="image-container image-switch">
      <img src={bindProps.png64.sofish_image} class="sofish-image" alt="" />
      <div
        class="close-image-btn"
        role="button"
        on:keydown={() => {}}
        tabindex="0"
        on:click={() => {
          dispatch("closeBindAccount");
        }}
      >
        <img src={bindProps.png64.close_image} class="close-image" alt="X" />
      </div>
    </div>
    <div class="account-bind">
      <!-- facebook -->
      {#if whereUserDetailBind(4)}
        <button
          type="button"
          class="account-bind-button fb-button"
          on:click={() => {
            // dispatch("openUnbindFacebook");
            dispatch("whereBindFacebook", { bindType: 0 });
          }}>{$t("sf_link_done_facebook")}</button
        >
      {:else}
        <button
          type="button"
          class="account-bind-button google-button"
          on:click={() => {
            dispatch("whereBindFacebook", { bindType: 1 });
          }}>{$t("sf_link_with_facebook")}</button
        >
      {/if}
      <img
        class="input-left-icon input-user-icon"
        src={bindProps.png64.fb_icon2}
        alt=""
      />
    </div>
    <!-- google -->
    <div class="account-bind">
      {#if whereUserDetailBind(3)}
        <button
          type="button"
          class="account-bind-button fb-button"
          on:click={() => {
            dispatch("toBindGoogle", { bindType: 2 });
          }}>{$t("sf_link_done_google")}</button
        >
      {:else}
        <button
          type="button"
          class="account-bind-button google-button"
          on:click={() => {
            dispatch("toBindGoogle", { bindType: 1 });
          }}>{$t("sf_link_with_google")}</button
        >
      {/if}
      <img
        class="input-left-icon input-user-icon"
        src={bindProps.png64.google_icon}
        alt=""
      />
    </div>
    <!-- fb -->
    <div class="account-bind">
      {#if whereUserDetailBind(5)}
        <button
          type="button"
          class="account-bind-button fb-button"
          on:click={() => {
            dispatch("toUnBindIOS");
          }}>{$t("other.sf_link_done_apple")}</button
        >
      {:else}
        <button
          type="button"
          class="account-bind-button google-button"
          on:click={() => {
            dispatch("toBindIOS");
          }}>{$t("other.sf_link_with_apple")}</button
        >
      {/if}
      <img
        class="input-left-icon input-user-icon"
        src={bindProps.png64.ios_icon}
        alt=""
      />
    </div>
    <!-- email -->
    <div class="account-bind">
      {#if whereUserDetailBind(2)}
        <button
          type="button"
          class="account-bind-button fb-button"
          on:click={() => {
            dispatch("bindEmail");
          }}>{$t("sf_link_done_email")}</button
        >
      {:else}
        <button
          type="button"
          class="account-bind-button google-button"
          on:click={() => {
            dispatch("bindEmail");
          }}>{$t("sf_link_with_email")}</button
        >
      {/if}
      <img
        class="input-left-icon input-user-icon"
        src={bindProps.png64.email_image2}
        alt=""
      />
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
    .form-group {
      display: flex;
      align-items: center;
      position: relative;
      margin-bottom: 20px;
      input {
        width: 100%;
        padding: 10px 10px 10px calc(5% + 16px);
        margin-bottom: 10px;
        border: 1px solid #ccc;
        box-sizing: border-box;
        border-radius: 50px;
        flex: 1;
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
        width: 16px;
        height: 16px;
      }

      .input-suo-icon {
        transform: translateY(-56%);
        width: 16px;
        height: 16px;
      }

      .input-right-icon {
        position: absolute;
        right: 3%;
        top: 48%;
        margin-left: 10px;
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
      .input-button {
        transform: translateY(-64%);
        width: 70px;
        height: 30px;
        border-radius: 50px;
        right: 1%;
        border: red;
      }
    }
    .bind-class {
      justify-content: center;
    }
    .form-text {
      font-size: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;
    }
    .form-text-red {
      color: #ff4332;
    }
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
      }
      .fb-button {
        background-color: #029cffff;
        color: white;
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
    .login-register {
      display: flex;
      align-items: center;
      position: relative;
      margin-bottom: 20px;
      button {
        width: 100%;
        padding: 10px;
        background-color: white;
        color: white;
        border: none;
        cursor: pointer;
        margin: 5px;
        border-radius: 50px;
        color: #ff4332;
        border: solid 1px red;
        &:hover {
          background-color: #ff4332;
          color: white;
        }
      }
    }
    .user-policy {
      display: flex;
      align-items: center;
      position: relative;
      font-size: 12px;
    }
    .image-container {
      display: flex;
      align-items: center;
      width: 100%;
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

    label {
      display: block;
      margin-bottom: 5px;
    }
  }

  .container-login {
    z-index: 60;
    height: auto;
    transform: translateX(-50%) translateY(-50%);
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
