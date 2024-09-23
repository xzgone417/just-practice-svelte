<script lang="ts">
  import { fade } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  import { t, locale } from "../lib/i18n";
  export let accountProps: any = {};
  export let theUsername = "";
  export let password = "";
  const dispatch = createEventDispatcher();
  function timestampToTime(timestamps: string | number | Date) {
    timestamps = Number(timestamps);
    var date = new Date(timestamps);
    var year = date.getFullYear();
    var month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are zero based, so we add one and use a string padding of zero to make it a two digit number
    var day = ("0" + date.getDate()).slice(-2); // Same as above for days
    var hours = ("0" + date.getHours()).slice(-2);
    var minutes = ("0" + date.getMinutes()).slice(-2);
    var seconds = ("0" + date.getSeconds()).slice(-2);
    return (
      year +
      "-" +
      month +
      "-" +
      day +
      " " +
      hours +
      ":" +
      minutes +
      ":" +
      seconds
    );
  }
  function truncateAndMask(name: string, maxLength = 16) {
    if (name.length <= maxLength) {
      // 如果名字长度小于等于最大长度，直接返回名字
      return name;
    } else {
      // 如果名字长度超过最大长度，截断并添加星号
      return name.substring(0, maxLength) + "****";
    }
  }
  function accountPropsUsername(params: any) {
    // dispatch("accountEmitsTheUsername", params.data);
  }
</script>

<!--!真切换账号,历史列表-->
{#if accountProps.isShowSwitchAccount}
  <div
    class="container container-switch"
    transition:fade={{ delay: 250, duration: 300 }}
  >
    <div class="image-container image-switch">
      <img src={accountProps.png64.sofish_image} class="sofish-image" alt="" />
      <div
        class="close-image-btn"
        role="button"
        on:keydown={() => {}}
        tabindex="0"
        on:click={() => {
          dispatch("closeSwitchModal");
        }}
      >
        <img src={accountProps.png64.close_image} class="close-image" alt="X" />
      </div>
    </div>
    <div
      class="switch-history"
      on:click={() => {
        dispatch("showSwitchAccountList");
      }}
      role="button"
      on:keydown={() => {}}
      tabindex="0"
      style="margin-bottom:0"
    >
      <div class="history-avatar-box">
        <img
          class="history-avatar"
          src={accountProps.historyImgs[
            Number(accountProps.theHistoryUserInfo.displayType)
          ]}
          alt=""
        />
      </div>
      <div class="history-center-title">
        <div class="history-name-text">
          {truncateAndMask(accountProps.theHistoryUserInfo.loginName)}
        </div>
        <div class="time-text">
          <img src={accountProps.png64.time_text} alt="" />
          <span
            >{$t("other.last_login_time")}: {accountProps.countValueTime(
              accountProps.theHistoryUserInfo.timestamp
            )}</span
          >
        </div>
      </div>
      <div class="history-pull-down-box">
        <img class="pull-down" src={accountProps.png64.pull_down} alt="" />
      </div>
    </div>
    {#if accountProps.showHistoryAccountList}
      <div class="history-options">
        <div class="dropdown-content" id="dropdown-content">
          {#each accountProps.userLoginInfoList as item, index (item.uid)}
            <div
              class="history-option"
              on:click={() => {
                dispatch("selectHistoryUserInfo", { item: item });
              }}
              role="button"
              on:keydown={() => {}}
              tabindex="0"
            >
              <div class="history-avatar-box">
                <img
                  class="history-avatar"
                  src={accountProps.historyImgs[Number(item.displayType)]}
                  alt=""
                />
              </div>
              <div class="history-center-title">
                <div class="history-name-text">
                  {truncateAndMask(item.loginName)}
                </div>
                <div class="time-text">
                  <img src={accountProps.png64.time_text} alt="" />
                  <span
                    >{$t("other.last_login_time")}: {accountProps.countValueTime(
                      item.timestamp
                    )}</span
                  >
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/if}
    <div class="login-register" style="margin-top: 20px;">
      <button
        class="login"
        style="background-color: rgb(255,67,50);color: white;"
        type="submit"
        on:click={() => {
          dispatch("toSwitchLogin");
        }}>{$t("sf_action_login")}</button
      >
    </div>
    <div
      class="login-font-class"
      on:click={() => {
        dispatch("showLoginModalOther");
      }}
      role="button"
      on:keydown={() => {}}
      tabindex="0"
      style="text-align: center;"
    >
      {$t("sf_login_other_types")}
    </div>
  </div>
{/if}

<!-- todo 账号注销成功 -->
{#if accountProps.isShowEmailTips}
  <div
    class="container container-login"
    transition:fade={{ delay: 250, duration: 300 }}
  >
    <div class="image-container image-logtips">
      <span class="sofish-image" style="font-size:18px ;font-weight:600"
        >{$t("sf_cancel_account_success_title")}</span
      >
      <div
        class="close-image-btn"
        role="button"
        on:keydown={() => {}}
        tabindex="0"
        on:click={() => {
          dispatch("confirmOff");
        }}
      >
        <img src={accountProps.png64.close_image} class="close-image" alt="X" />
      </div>
    </div>
    <div class="form-text-tips">
      {@html $t("other.sf_cancel_account_success_content_1")}
      <span style="color:red;"
        >{timestampToTime(accountProps.emailTips.createTime)}</span
      >
      {@html $t("other.sf_cancel_account_success_content_2")}
      <span style="color:red;"
        >{timestampToTime(accountProps.emailTips.cancelTime)}</span
      >
      {@html $t("other.sf_cancel_account_success_content_3")}
      <!-- <p>
        &nbsp;&nbsp;&nbsp;&nbsp;感谢您对本游戏的支持。您的账号已于<span
          style="color:red;"
          >{timestampToTime(accountProps.emailTips.createTime)}</span
        >完成注销条件审核，成功提交注销申请。除法律法规规定和注销协议约定情形外，我们将为你保留该账号至<span
          style="color:red;"
          >{timestampToTime(accountProps.emailTips.cancelTime)}</span
        >(从您提交注销申请次日起15日)。在此之后，账号注销申请成功，我们将删除或匿名化处理您的相关个人信息。
      </p>
      <p style="color:red;">
        &nbsp;&nbsp;&nbsp;&nbsp;在前述15日届满前，请您不要登录和使用此账号，以确保注销的顺利完成，否则视为您撤销注销申请
      </p> -->
    </div>

    <div class="login-register">
      <button
        class="register"
        style="background-color: rgb(255,67,50);color: white;"
        type="submit"
        on:click={() => {
          dispatch("confirmOff");
        }}>{$t("sf_action_confirm")}</button
      >
    </div>
  </div>
{/if}
<!--  todo 账号升级-->
{#if accountProps.isShowUpdateAccounted}
  <div
    class="container container-login"
    transition:fade={{ delay: 250, duration: 300 }}
  >
    <div class="image-container image-logoff">
      <img src={accountProps.png64.sofish_image} class="sofish-image" alt="" />
      <div
        class="close-image-btn"
        role="button"
        on:keydown={() => {}}
        tabindex="0"
        on:click={() => {
          dispatch("closeUpdateAccounted");
        }}
      >
        <img src={accountProps.png64.close_image} class="close-image" alt="X" />
      </div>
    </div>
    <div class="form-text">{$t("sf_user_upgrade_account")}</div>
    <div class="form-group">
      <span>{$t("sf_user_account_id")}</span>
      <span style="margin-left: 5px">{accountProps.userLoginInfo.uid}</span>
    </div>
    <div class="form-group">
      <span style="display: inline-block;width: 50px;"
        >{$t("sf_menu_account")}:</span
      >
      <span
        style="margin-left: 5px;overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;">{accountProps.accountLoginName}</span
      >
      <button
        class="account"
        style="background-color: rgb(255,67,50);color: white;border: none;border-radius: 50px;width: 58px;margin-left: auto;padding:5px"
        type="submit"
        on:click={() => {
          dispatch("copyAccount");
        }}>{$t("sf_action_copy")}</button
      >
    </div>
  </div>
{/if}
<!-- todo 账号更新 -->
{#if accountProps.isShowUpdateAccount}
  <div
    class="container container-login"
    transition:fade={{ delay: 250, duration: 300 }}
  >
    <div class="image-container image-login">
      <img src={accountProps.png64.sofish_image} class="sofish-image" alt="" />
      <div
        class="close-image-btn"
        role="button"
        on:keydown={() => {}}
        tabindex="0"
        on:click={() => {
          dispatch("closeUpdateAccount");
        }}
      >
        <img src={accountProps.png64.close_image} class="close-image" alt="X" />
      </div>
    </div>
    <div class="form-group">
      <slot name="theUsername">
        <input
          type="text"
          id="username"
          name="username"
          bind:value={theUsername}
          on:input={accountPropsUsername}
          autocapitalize="off"
          maxlength="20"
          placeholder={$t("sf_hint_account")}
        /></slot
      >
      <img
        class="input-left-icon input-user-icon"
        src={accountProps.png64.input_user_icon}
        alt=""
      />
    </div>
    <div class="form-group">
      {#if accountProps.eyeShow}
        <slot name="passwordShow">
          <input
            type="password"
            id="thePassword"
            name="password"
            bind:value={password}
            on:input={() => {
              dispatch("accountEmitsPassword");
            }}
            maxlength="20"
            autocapitalize="off"
            placeholder={$t("sf_hint_password")}
          /></slot
        >
      {:else}
        <slot name="passwordHidden">
          <input
            type="text"
            id="thePassword"
            name="password"
            bind:value={password}
            on:input={() => {
              dispatch("accountEmitsPassword");
            }}
            maxlength="20"
            autocapitalize="off"
            placeholder={$t("sf_hint_password")}
          />
        </slot>
      {/if}
      <img
        class="input-left-icon input-suo-icon"
        src={accountProps.png64.input_suo_icon}
        alt=""
      />
      {#if accountProps.eyeShow}
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
            src={accountProps.png64.input_eye_icon_hidden}
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
            src={accountProps.png64.input_eye_icon_visible}
            style="width:100%;height:100%;visibility:{accountProps.eyeShow
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
          dispatch("confirmUpdateAccount");
        }}>{$t("sf_action_confirm")}</button
      >
    </div>
  </div>
{/if}

<style lang="less">
  #thePassword::-ms-reveal {
    display: none;
  }

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
      .input-eye-icon {
        transform: translateY(-70%);
        width: 16px;
        height: 16px;
        z-index: 70;
        cursor: pointer;
      }
    }
    .switch-history {
      display: flex;
      align-items: center;
      background-color: white;
      min-height: 20%;
      padding: 6px 0;
      border-radius: 10px;
      cursor: pointer;
      .history-avatar-box {
        width: 25%;
        text-align: center;
        .history-avatar {
          width: 36px;
          height: 36px;
        }
      }

      .history-center-title {
        width: 60%;
        text-align: start;
        .history-name-text {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .time-text {
          margin: 0px;
          text-align: start;
          img {
            width: 15px;
            height: 15px;
            vertical-align: middle;
          }
          span {
            font-size: 8px;
            color: gray;
          }
        }
      }
      .history-pull-down-box {
        width: 15%;
        text-align: center;
        .pull-down {
          width: 20px;
          height: 20px;
          cursor: pointer;
        }
      }
    }
    .form-text {
      font-size: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;
    }
    .form-text-tips {
      font-size: 14px;
      margin-bottom: 5px;
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
    .image-login {
      margin-bottom: 20px;
      height: 19%;
    }
    .image-switch {
      margin-bottom: 3.5vh;
      height: 24%;
    }
    .image-logoff {
      margin-bottom: 10px;
      height: 19%;
    }
    .image-logtips {
      margin-bottom: 20px;
      height: 9%;
    }
  }

  .container-login {
    z-index: 60;
    height: auto;
    transform: translateX(-50%) translateY(-50%);
  }

  .container-switch {
    z-index: 50;
    min-height: 236px;
    transform: translateX(-50%) translateY(-50%);

    // css切换账号历史信息
    // }
    .history-options {
      position: relative;
      // display: inline-block;
      width: 100%;

      .dropdown-content {
        // display: none;
        position: absolute;
        background-color: white;
        min-width: 100%;
        z-index: 100;
        // border-bottom-left-radius: 10px;
        // border-bottom-right-radius: 10px;
        border-radius: 10px;

        .history-option {
          display: flex;
          align-items: center;
          position: relative;
          width: 100%;
          height: 20%;
          box-sizing: border-box;
          padding: 4px 0;
          cursor: pointer;
          border-top: 1px solid #d7d7d7;
          .history-avatar-box {
            width: 25%;
            text-align: center;

            .history-avatar {
              width: 36px;
              height: 36px;
              // object-fit: cover;
              // background-size: contain;
            }
          }

          .history-center-title {
            width: 70%;
            text-align: start;

            .history-name-text {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }

            .time-text {
              margin: 0px;
              text-align: start;

              img {
                width: 15px;
                height: 15px;
                vertical-align: middle;
              }

              span {
                font-size: 8px;
                color: gray;
              }
            }
          }
        }
      }
    }
  }

  .login-font-class {
    font-size: 12px;
    color: #ff4332;
    cursor: pointer;
  }
  @media screen and (max-width: 600px) {
    .container {
      max-width: 90%;
    }
  }
</style>
