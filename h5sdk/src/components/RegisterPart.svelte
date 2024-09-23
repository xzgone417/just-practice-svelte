<script lang="ts">
  import { fade } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  import { t, locale } from "../lib/i18n";
  export let registerProps: any = {};
  export let theUsername = "";
  export let password = "";
  export let isUserChecked = false;
  const dispatch = createEventDispatcher();
</script>

<!--!真注册登录。账号注册账号登录-->
{#if registerProps.isShowLoginRegister}
  <div
    class="container container-login"
    transition:fade={{ delay: 250, duration: 300 }}
  >
    <div class="image-container image-login">
      {#if registerProps.showBack}
        <div
          class="back-image-btn"
          role="button"
          on:keydown={() => {}}
          tabindex="0"
          on:click={() => {
            dispatch("showSwitchAccount");
          }}
        >
          <img src={registerProps.png64.back_image} class="back-image" alt="" />
        </div>
      {/if}
      <img src={registerProps.png64.sofish_image} class="sofish-image" alt="" />
      <div
        class="close-image-btn"
        role="button"
        on:keydown={() => {}}
        tabindex="0"
        on:click={() => {
          dispatch("closeLoginModal");
        }}
      >
        <img
          src={registerProps.png64.close_image}
          class="close-image"
          alt="X"
        />
      </div>
    </div>
    <div class="form-group">
      <input
        type="text"
        id="username"
        name="username"
        bind:value={theUsername}
        maxlength="20"
        autocapitalize="off"
        placeholder={$t("sf_hint_account")}
      />
      <img
        class="input-left-icon input-user-icon"
        src={registerProps.png64.input_user_icon}
        alt=""
      />
    </div>
    <div class="form-group">
      {#if registerProps.eyeShow}
        <input
          type="password"
          id="thePassword"
          name="password"
          bind:value={password}
          maxlength="20"
          autocapitalize="off"
          placeholder={$t("sf_hint_password")}
        />
      {:else}
        <input
          type="text"
          id="thePassword"
          name="password"
          bind:value={password}
          maxlength="20"
          autocapitalize="off"
          placeholder={$t("sf_hint_password")}
        />
      {/if}
      <img
        class="input-left-icon input-suo-icon"
        src={registerProps.png64.input_suo_icon}
        alt=""
      />
      {#if registerProps.eyeShow}
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
            src={registerProps.png64.input_eye_icon_hidden}
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
            src={registerProps.png64.input_eye_icon_visible}
            style="width:100%;height:100%;visibility:{registerProps.eyeShow
              ? 'hidden'
              : 'visible'}"
            alt=""
          />
        </div>
      {/if}
    </div>
    {#if registerProps.isShowLogin}
      <div class="forgot-password">
        <span
          on:click={() => {
            dispatch("forgotPassword");
          }}
          role="button"
          on:keydown={() => {}}
          tabindex="0">{$t("sf_forget_password")}</span
        >
      </div>
    {/if}
    <div class="login-register">
      <!-- 注册与登录都是所有按钮 -->
      {#if registerProps.isShowLogin}
        <button
          class="register"
          type="submit"
          on:click={() => {
            dispatch("showRegister");
          }}>{$t("sf_action_register")}</button
        >
        <button
          class="login"
          style="background-color: rgb(255,67,50);color: white;"
          type="submit"
          on:click={() => {
            dispatch("toLogin");
          }}>{$t("sf_action_login")}</button
        >
      {/if}
      <!-- 纯注册 -->
      {#if registerProps.isShowRegister}
        <button
          class="register"
          style="background-color: rgb(255,67,50);color: white;"
          type="submit"
          on:click={() => {
            dispatch("toRegister");
          }}>{$t("sf_action_register")}</button
        >
      {/if}
    </div>
    <!-- 纯注册 -->
    {#if registerProps.isShowRegister}
      <div class="user-policy">
        <label>
          <input
            type="checkbox"
            bind:checked={isUserChecked}
            on:change={() => {
              dispatch("handleCheckboxChange");
            }}
          />
          {$t("sf_cancel_account_agreement_agree")}
          <span
            ><a
              href="#top"
              on:click|preventDefault={() => {
                dispatch("openPrivacyPolicyUer");
              }}>{$t("sf_protocol_user")}</a
            ><a
              href="#top"
              on:click|preventDefault={() => {
                dispatch("openPrivacyPolicy");
              }}>{$t("sf_protocol_privacy")}</a
            ></span
          >
        </label>
      </div>
    {/if}
    <!-- todo第三方方式登录，谷歌登录，脸书登录 -->
    {#if registerProps.isShowLoginOther}
      <div class="login-other">
        {#each registerProps.loginTypes as item}
          {#if item == "3"}
            <slot name="google"></slot>
          {:else if item == "4"}
            <div
              on:click={() => {
                dispatch("FBLogin");
              }}
              role="button"
              on:keydown={() => {}}
              tabindex="0"
            >
              <img src={registerProps.png64.fb_icon} alt="" />
            </div>
          {:else if item == "5"}
            <slot name="ios"></slot>
          {:else if item == "1"}
            <!-- <div
              on:click={() => {
                dispatch("whereVisitorLogin");
              }}
              role="button"
              on:keydown={() => {}}
              tabindex="0"
            >
              <img src={registerProps.png64.sofish_login_icon} alt="" />
            </div> -->
          {/if}
        {/each}
      </div>
    {/if}
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
        background-size: contain;
        background-repeat: no-repeat;
      }
      .input-eye-icon {
        cursor: pointer;
        transform: translateY(-70%);
        width: 16px;
        height: 16px;
        z-index: 70;
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
    .login-other {
      display: flex;
      align-items: center;
      position: relative;
      justify-content: center;
      align-items: center;
      img {
        margin: 16px;
        width: 32px;
        height: 32px;
        background-size: contain;
        background-repeat: no-repeat;
        cursor: pointer;
      }
    }
    .forgot-password {
      display: flex;
      align-items: center;
      position: relative;
      font-size: 12px;
      justify-content: flex-end;
      margin-left: auto;
      margin-right: 0px;
      margin-bottom: 5px;
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
    .image-login {
      margin-bottom: 20px;
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
  @media (max-width: 600px) {
    .container {
      max-width: 90%;
    }
  }
</style>
