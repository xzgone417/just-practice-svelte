<script lang="ts">
  import { fade } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  import { t, locale } from "../lib/i18n";
  export let passwordProps: any = {};
  export let passUserName = "";
  export let passEmail = "";
  export let passEmailOtp = "";
  export let passwordReset = "";
  export let userNameEmail = "";
  export let userNameDataUsername = "";
  const dispatch = createEventDispatcher();
</script>

<!--todo 忘记密码，找回密码  -->
{#if passwordProps.isShowGetPassWord}
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
          dispatch("closeGetPassWord");
        }}
      >
        <img class="back-image" alt="<" src={passwordProps.png64.back_image} />
      </div>
      <img src={passwordProps.png64.sofish_image} class="sofish-image" alt="" />
    </div>
    <div class="form-text">
      {$t("sf_reset_password_desc")}
    </div>
    <div class="form-group">
      <input
        type="text"
        id="passUserName"
        name="passUserName"
        bind:value={passUserName}
        maxlength="20"
        autocapitalize="off"
        placeholder={$t("sf_hint_account")}
      />
      <img
        class="input-left-icon input-user-icon"
        src={passwordProps.png64.input_user_icon}
        alt=""
      />
    </div>
    <div class="form-group">
      <input
        type="text"
        id="passEmail"
        name="passEmail"
        autocapitalize="off"
        bind:value={passEmail}
        placeholder={$t("sf_hint_email")}
      />
      <img
        class="input-left-icon input-user-icon"
        src={passwordProps.png64.email_icon}
        alt=""
      />
    </div>
    <div class="login-register">
      <button
        class="register"
        style="background-color: rgb(255,67,50);color: white;"
        type="submit"
        on:click={() => {
          dispatch("submitNext");
        }}>{$t("sf_action_next")}</button
      >
    </div>
    <div class="user-policy">
      <span
        on:click={() => {
          dispatch("getUserName");
        }}
        role="button"
        on:keydown={() => {}}
        tabindex="0">{$t("sf_forget_account")}</span
      >
      <span
        style="display: flex;margin-left: auto;"
        on:click={() => {
          dispatch("contactCustomer");
        }}
        role="button"
        on:keydown={() => {}}
        tabindex="0">{$t("sf_user_contact_service")}</span
      >
    </div>
  </div>
{/if}

<!-- todo重置密码 忘记密码-->
{#if passwordProps.isShowResetPassWord}
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
          dispatch("closePasswordResetWord");
        }}
      >
        <img class="back-image" alt="<" src={passwordProps.png64.back_image} />
      </div>
      <img src={passwordProps.png64.sofish_image} class="sofish-image" alt="" />
    </div>
    <div class="form-group">
      <input
        type="text"
        id="passemailotp"
        name="passemailotp"
        bind:value={passEmailOtp}
        autocapitalize="off"
        placeholder={$t("sf_hint_verify_code")}
      />
      <img
        class="input-left-icon input-suo-icon"
        src={passwordProps.png64.passemailotp_icon}
        alt=""
      />
      {#if passwordProps.emailTimeShow}
        <button
          class="input-right-icon input-button"
          style="background-color: rgb(255,67,50);color: white;"
          disabled
          type="submit">{passwordProps.emailTimeCount}s</button
        >
      {:else}
        <button
          class="input-right-icon input-button"
          style="background-color: rgb(255,67,50);color: white;"
          type="submit"
          disabled={passwordProps.emailTimeShow}
          on:click={() => {
            passwordProps.emailTimeCount = 60;
            passwordProps.emailTimeShow = true;
            dispatch("notDebounceSendEmail", {
              flag: "password",
              email: passwordProps.passEmail,
            });
          }}>{passwordProps.emailText}</button
        >
      {/if}
    </div>
    <div class="form-group">
      {#if passwordProps.eyeShow}
        <input
          type="password"
          id="thePassword"
          name="passwordReset"
          bind:value={passwordReset}
          maxlength="20"
          autocapitalize="off"
          placeholder={$t("sf_hint_password_new")}
        />
      {:else}
        <input
          type="text"
          id="thePassword"
          name="passwordReset"
          bind:value={passwordReset}
          maxlength="20"
          autocapitalize="off"
          placeholder={$t("sf_hint_password_new")}
        />
      {/if}
      <img
        class="input-left-icon input-suo-icon"
        src={passwordProps.png64.input_suo_icon}
        alt=""
      />
      {#if passwordProps.eyeShow}
        <div
          class="input-right-icon input-eye-icon"
          on:click={() => {
            dispatch("handleEyeShow");
          }}
          role="button"
          on:keydown={() => {}}
          tabindex="0"
        >
          <img
            style="width:100%;height:100%"
            src={passwordProps.png64.input_eye_icon_hidden}
            alt=""
          />
        </div>
      {:else}
        <div
          class="input-right-icon input-eye-icon"
          on:click={() => {
            dispatch("handleEyeShow");
          }}
          role="button"
          on:keydown={() => {}}
          tabindex="0"
        >
          <img
            src={passwordProps.png64.input_eye_icon_visible}
            style="width:100%;height:100%;visibility:{passwordProps.eyeShow
              ? 'hidden'
              : 'visible'}"
            alt=""
          />
        </div>
      {/if}
    </div>
    <div class="login-register">
      <button
        class="register"
        style="background-color: rgb(255,67,50);color: white;"
        type="submit"
        on:click={() => {
          dispatch("submitRest");
        }}>{$t("sf_action_reset")}</button
      >
    </div>
    <div class="user-policy">
      <span
        style="display: flex;margin-left: auto;"
        on:click={() => {
          dispatch("contactCustomer");
        }}
        role="button"
        on:keydown={() => {}}
        tabindex="0">{$t("sf_user_contact_service")}</span
      >
    </div>
  </div>
{/if}
<!-- todo 忘记账号，找回账号 -->
{#if passwordProps.isShowGetUserName}
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
          dispatch("closeGetUserName");
        }}
      >
        <img class="back-image" alt="<" src={passwordProps.png64.back_image} />
      </div>
      <img src={passwordProps.png64.sofish_image} class="sofish-image" alt="" />
    </div>
    <div class="form-text">
      {$t("sf_find_account_desc")}
    </div>
    <div class="form-group" style="margin-bottom: 44px;margin-top: 20px;">
      <input
        type="text"
        id="userNameEmail"
        name="userNameEmail"
        bind:value={userNameEmail}
        autocapitalize="off"
        placeholder={$t("sf_hint_email")}
      />
      <img
        class="input-left-icon input-user-icon"
        src={passwordProps.png64.email_icon}
        alt=""
      />
    </div>
    <div class="login-register">
      <button
        class="register"
        style="background-color: rgb(255,67,50);color: white;"
        type="submit"
        on:click={() => {
          dispatch("submitUserNameNext");
        }}>{$t("sf_action_next")}</button
      >
    </div>
    <div class="user-policy">
      <span
        style="display: flex;margin-left: auto;"
        on:click={() => {
          dispatch("contactCustomer");
        }}
        role="button"
        on:keydown={() => {}}
        tabindex="0">{$t("sf_user_contact_service")}</span
      >
    </div>
  </div>
{/if}
<!-- todo 找回账号之后回调显示账号-->
{#if passwordProps.isShowUserName}
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
          dispatch("closeUserName");
        }}
      >
        <img class="back-image" alt="<" src={passwordProps.png64.back_image} />
      </div>
      <img src={passwordProps.png64.sofish_image} class="sofish-image" alt="" />
    </div>
    <div class="form-text form-text-red">
      {$t("sf_find_account_tips")}
    </div>
    <div class="form-group" style="margin-bottom: 44px;margin-top: 20px;">
      <input
        type="text"
        id="passUserName"
        name="passUserName"
        bind:value={userNameDataUsername}
        autocapitalize="off"
        disabled
      />
      <img
        class="input-left-icon input-user-icon"
        src={passwordProps.png64.input_user_icon}
        alt=""
      />
    </div>
    <div class="login-register">
      <button
        class="register"
        style="background-color: rgb(255,67,50);color: white;"
        type="submit"
        on:click={() => {
          dispatch("copyAndLogin");
        }}>{$t("sf_find_account_login")}</button
      >
    </div>
    <div class="user-policy">
      <span
        style="display: flex;margin-left: auto;"
        on:click={() => {
          dispatch("contactCustomer");
        }}
        role="button"
        on:keydown={() => {}}
        tabindex="0">{$t("sf_user_contact_service")}</span
      >
    </div>
  </div>
{/if}

<style lang="less">
  #thePassword::-ms-reveal {
    display: none;
  }

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
        padding: 10px;
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
      .input-eye-icon {
        cursor: pointer;
        transform: translateY(-70%);
        width: 16px;
        height: 16px;
        z-index: 70;
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
      cursor: pointer;
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
  @media (max-width: 600px) {
    .container {
      max-width: 90%;
    }
  }
</style>
