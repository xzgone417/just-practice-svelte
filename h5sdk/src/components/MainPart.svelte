<script lang="ts">
  import { fade } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  import { t, locale } from "../lib/i18n";
  export let mainProps: any = {};
  export let theOrderScroll: any = null;
  const dispatch = createEventDispatcher();
</script>

{#if mainProps.isShowUserCenter}
  <div class="user-center">
    <div class="title-bar">
      <div
        class="back-image-btn"
        role="button"
        on:keydown={() => {}}
        tabindex="0"
        on:click={() => {
          dispatch("leftUserCenter");
        }}
        style="width: 36px;height:36px;"
      >
        <img src={mainProps.png64.top_back_png} class="back-image" alt="<" />
      </div>
      <h1 class="title">{mainProps.topContext}</h1>
      <div
        class="close-image-btn"
        role="button"
        on:keydown={() => {}}
        tabindex="0"
        on:click={() => {
          dispatch("closeUserCenter");
        }}
        style="width: 36px;height:36px;"
      >
        <img
          src={mainProps.png64.top_close_image}
          class="close-image"
          alt="X"
        />
      </div>
    </div>
    <!-- 储值订单 -->
    {#if mainProps.showStoredValueOrder}
      <div class="the-main-center">
        <div class="storeValueOrderHead">
          <span class="storeValueOrderHead-number">{$t("sf_order_id")}</span>
          <span class="storeValueOrderHead-server">{$t("sf_order_server")}</span
          >
          <span class="storeValueOrderHead-role">{$t("sf_order_role")}</span>
          <span class="storeValueOrderHead-money">
            {$t("sf_order_amount")}
          </span>
        </div>
        <div
          class="the-order-scroll"
          bind:this={theOrderScroll}
          on:scroll={() => {
            dispatch("weOrderScroll");
          }}
        >
          {#if mainProps.orderRefresh}
            <div style="text-align: center;">Loading...</div>
          {/if}
          {#if mainProps.ourOrderList}
            {#each mainProps.storedValueOrderList as item}
              <div class="storeValueOrderItem">
                <div
                  class="storeValueOrderItem-line storeValueOrderItem-number"
                >
                  {item.id}
                </div>
                <div
                  class="storeValueOrderItem-line storeValueOrderItem-server"
                >
                  {item.serverName}
                </div>
                <div class="storeValueOrderItem-line storeValueOrderItem-role">
                  {item.roleName}
                </div>
                <div class="storeValueOrderItem-line storeValueOrderItem-money">
                  {item.price}
                </div>
                <div class="storeValueOrderItem-button">
                  <button
                    class="order-copy-button"
                    on:click={() => {
                      dispatch("eCopyToClipboard", item.id);
                    }}
                  >
                    {$t("sf_action_copy")}</button
                  >
                </div>
              </div>
            {/each}
          {/if}
          {#if mainProps.orderLoading}
            <div style="text-align: center;">Loading...</div>
          {/if}
        </div>
      </div>
      <!-- 初步打开问卷 -->
    {:else if mainProps.showQuestionnaireDoor}
      <div class="the-main-center">
        <div class="questionnaire-door">
          <div class="questionnaire-door-title">
            <div class="questionnaire-door-title-son">
              {mainProps.questionnaireInfo.qname}
            </div>
          </div>
          <div class="questionnaire-door-explain">
            <div class="questionnaire-door-explain-son">
              <div>{$t("sf_question_instruction")}</div>
              <div>{mainProps.questionnaireInfo.content}</div>
            </div>
          </div>
          <div class="questionnaire-door-open">
            <button
              class="open-questionnaire-button"
              on:click={() => {
                dispatch("openQuestionnaire");
              }}
            >
              {$t("sf_user_questionnaire")}</button
            >
          </div>
        </div>
      </div>
      <!-- 打开问卷 -->
    {:else if mainProps.showQuestionnaire}
      <div class="the-main-center">
        <slot name="question"></slot>
      </div>
      <!-- 打开资讯 -->
    {:else if mainProps.showInformation}
      <div class="the-main-center">
        <div class="information-body">
          {#each mainProps.informationList as item}
            <div
              class="information-item"
              on:click|preventDefault={() => {
                dispatch("openInformationNews", { item: item });
              }}
              role="button"
              on:keydown={() => {}}
              tabindex="0"
            >
              <div class="information-item-title">
                <span class="information-item-newType">【{item.newType}】</span>
                <span class="information-item-titles">{item.title}</span>
              </div>
              <div class="information-item-time">{item.newTime}</div>
            </div>
          {/each}
        </div>
      </div>
      <!-- 打开资讯详情 -->
    {:else if mainProps.showInformationDetail}
      <div class="the-main-center">
        <div
          class="information-detail"
          contenteditable="false"
          bind:innerHTML={mainProps.informationDetail}
        ></div>
      </div>
      <!-- 打开礼包 -->
    {:else if mainProps.showGiftBag}
      <div class="the-main-center">
        <div class="gift-bag-list">
          {#each mainProps.giftBagList as item, index}
            <div class="gift-bag-item">
              <div class="gift-bag-item-title">
                <img src={item.iconUrl} alt="" class="gift-bag-item-img" />
                <div class="gift-bag-item-names">
                  <div class="gift-bag-item-giftname">
                    {item.giftname}
                  </div>
                  <div class="gift-bag-item-description">
                    {item.description}
                  </div>
                </div>
              </div>
              <div class="gift-bag-item-btns">
                {#if item.code}
                  <button
                    class="gift-bag-item-look"
                    on:click={() => {
                      dispatch("openGiftBagInfo", { item: item });
                    }}>{$t("sf_action_check")}</button
                  >
                {:else}
                  <button
                    class="gift-bag-item-accept"
                    on:click={() => {
                      dispatch("openGiftBag", {
                        giftId: item.id,
                        index: index,
                      });
                    }}>{$t("sf_action_receive")}</button
                  >
                {/if}
              </div>
            </div>
          {/each}
        </div>
      </div>
      <!-- 账户页面，主页面 -->
    {:else}
      <div class="the-main-center">
        {#if mainProps.isLogin}
          <div class="avatar-name">
            <div class="avatar-part">
              <img
                class="avatar"
                src={mainProps.historyImgs[
                  Number(mainProps.userLoginInfo.displayType)
                ]}
                alt=""
              />
              <div class="username-center-title">
                <div class="username" style="text-align:left;">
                  {mainProps.truncateAndMask(mainProps.userLoginInfo.loginName)}
                </div>
                <div
                  style="font-size:12px;color:#838383;margin-top:5px"
                  on:click|preventDefault={() => {
                    dispatch("eCopyToClipboard", mainProps.userLoginInfo.uid);
                  }}
                  role="button"
                  on:keydown={() => {}}
                  tabindex="0"
                >
                  uid:{mainProps.userLoginInfo.uid}
                </div>
              </div>
            </div>

            <button
              type="button"
              class="avatar-switch-btn"
              on:click={() => {
                dispatch("showSwitchAccount");
              }}>{$t("sf_user_switch_account")}</button
            >
          </div>
        {:else}
          <div class="avatar-name">
            <img
              class="avatar"
              src={mainProps.png64.avatar_visitor}
              alt="Avatar"
            />
            <button
              type="button"
              class="avatar-switch-btn"
              on:click={() => {
                dispatch("sdkShowLoginModal");
              }}>{$t("sf_action_login")}</button
            >
          </div>
        {/if}
        <div class="icon-list">
          <a
            class="icon-item"
            on:click|preventDefault={() => {
              dispatch("updateAccount");
            }}
            href="#top"
            style="text-decoration: none;"
          >
            <i class="icon account-upgrade"></i>
            <span class="label">{$t("sf_user_upgrade_account")}</span>
            <i class="enter"></i>
          </a>
          <div class="line"></div>
          <a
            class="icon-item"
            on:click|preventDefault={() => {
              dispatch("accountBind");
            }}
            href="#top"
            style="text-decoration: none;"
          >
            <i class="icon account-bind"></i>
            <span class="label">{$t("sf_link_title")}</span>
            <i class="enter"></i>
          </a>
          <div class="line"></div>
          <a
            class="icon-item"
            on:click|preventDefault={() => {
              dispatch("privacyPolicy");
            }}
            href="#top"
            style="text-decoration: none;"
          >
            <i class="icon account-policy"></i>
            <span class="label">{$t("sf_user_privacy_policy")}</span>
            <i class="enter"></i>
          </a>
          <div class="line"></div>
          <a
            class="icon-item"
            on:click|preventDefault={() => {
              dispatch("toStoredValueOrder");
            }}
            href="#top"
            style="text-decoration: none;"
          >
            <i class="icon account-order"></i>
            <span class="label">{$t("sf_user_recharge_order")}</span>
            <i class="enter"></i>
          </a>
          <div class="line"></div>
          <a
            class="icon-item"
            on:click|preventDefault={() => {
              dispatch("toLogOff");
            }}
            href="#top"
            style="text-decoration: none;"
          >
            <i class="icon account-delete"></i>
            <span class="label">{$t("sf_cancel_account_title")}</span>
            <i class="enter"></i>
          </a>
          <div class="line"></div>
          <a
            class="icon-item"
            on:click|preventDefault={() => {
              dispatch("customerService");
            }}
            href="#top"
            style="text-decoration: none;"
          >
            <i class="icon account-question"></i>
            <span class="label">{$t("sf_user_customer_service")}</span>
            <i class="enter"></i>
          </a>
          <div class="line"></div>
          {#if mainProps.questionFlag}
            <a
              class="icon-item"
              on:click|preventDefault={() => {
                dispatch("toQuestionnaireDoor");
              }}
              href="#top"
              style="text-decoration: none;"
            >
              <i class="icon account-question"></i>
              <span class="label">{$t("sf_user_questionnaire")}</span>
              <i class="enter"></i>
            </a>
          {/if}
        </div>
      </div>
    {/if}
    <div class="tab-bar">
      <a
        href="#top"
        class="tab"
        class:actives={mainProps.tabActive === 1}
        on:click|preventDefault={() => {
          dispatch("toOpenAccount");
        }}
      >
        <i class="tab-icon account"></i>
        <span class="tab-label">{$t("sf_menu_account")}</span>
      </a>
      <a
        href="#top"
        class="tab"
        class:actives={mainProps.tabActive === 2}
        on:click|preventDefault={() => {
          dispatch("toSofishWindowNews");
        }}
      >
        <i class="tab-icon news"></i>
        <span class="tab-label">{$t("sf_menu_news")}</span>
      </a>
      <a
        href="#top"
        class="tab"
        class:actives={mainProps.tabActive === 3}
        on:click|preventDefault={() => {
          dispatch("toGiftBag");
        }}
      >
        <i class="tab-icon gift"></i>
        <span class="tab-label">{$t("sf_menu_pack")}</span>
      </a>
      <a
        href="#top"
        class="tab"
        class:actives={mainProps.tabActive === 4}
        on:click|preventDefault={() => {
          dispatch("toCustomerService");
        }}
      >
        <i class="tab-icon support"></i>
        <span class="tab-label">{$t("sf_menu_support")}</span>
      </a>
    </div>
  </div>
{/if}

<style lang="less">
  .user-center {
    margin: 0 auto;
    width: 100%;
    height: 100%;
    min-width: 230px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #f4f4f4;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 30;
    // transform: translateX(-1.9%) translateY(-4.7%);
    .title-bar {
      display: flex;
      align-items: center;
      width: 100%;
      height: 10%;
      min-height: 45px;
      background-color: #ff6254;
      align-items: center;
      justify-content: center;
      .title {
        display: flex;
        width: 85%;
        height: 90%;
        text-align: center;
        color: white;
        align-items: center;
        justify-content: center;
      }
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
    }
    .avatar-name {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: white;
      width: 100%;
      height: 10%;
      min-height: 55px;
      margin-bottom: 20px;
      .avatar-part {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
      }
      .avatar {
        width: 30px;
        height: 30px;
        object-fit: cover;
        margin-right: 18px;
        margin-left: 20px;
        background-size: contain;
      }

      .username-center-title {
        min-width: 50%;
        margin-right: 10px;
        .username {
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }

      .avatar-switch-btn {
        max-width: 120px;
        min-width: 80px;
        margin-right: 10px;
        padding: 10px;
        background-color: white;
        border: 1.5px solid red;
        color: #ff4332;
        cursor: pointer;
        border-radius: 50px;
        // overflow: hidden;
        // text-overflow: ellipsis;
        // white-space: nowrap;
      }
    }

    .username {
      font-weight: bold;
    }
    .icon-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      background-color: white;
      margin-bottom: 30px;
      width: 100%;
      height: auto;
      align-items: center;
      justify-content: center;
      // overflow-y: scroll;
      // min-height: 330px;
      .icon-item {
        display: flex;
        align-items: center;
        text-align: center;
        width: 100%;
        margin-left: 20px;
        margin-right: 20px;
        height: 52px;
        .icon {
          display: flex;
          align-items: center;
          width: 35px;
          height: 35px;
          background-size: contain;
          background-repeat: no-repeat;
          margin-right: 15px;
          margin-bottom: 8px;
          margin-top: 8px;
        }
        .account-upgrade {
          background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADUAAAA1CAYAAADh5qNwAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFiUlEQVRogdWaXWxURRTHfzO77GKh0C4oCBiRSlsX6QOxAT8qiDHBROODoPGBSIwQG9OKKR+RFxUNgWg0QT5sSNREQ6LlgUTAYIxBGyhtAyoa2lI1VSjIVyk2st3SvePD3Nql3L17v3aFX7JJu52Z8z+dufecOTPC6GonQMYCDwPzgDLzczsQA8LAINADnAFOAO1AM/A90BeUCBGAU+OBZ4HngIfQ4t0yCBwEdgKfA5f9CPLjVAmwBlgK3OJHxAgSwGfAJuA3LwNID32KgM3opbOCYB3CHG+5Of5m054r3Dq1GGgDavC2zNwQNu20mXYd49Sp0cBWoAGY7EqafyabdreZOrLi5JmKAXuA+31JC4Ym4An0GzQj2WZqKtDIjeEQaB2NaF0ZsXNqAvAVEA9QVBDE0bomZmqQyakosBeYnQNRQTAb/UhErf6Yyan3gbm5UhQQc9E6r8PKqcVAdU7lBEc1Fq/7kW+/InRcyPdr2w9/AfcAvUNfjJyp9dxcDoHWuz79i/SZuhPoBEblWVQQXAVKgS64dqbWki+HrvwDRirIEUehk2tgeKYmACcJPjnVDAygWg+jmg+hfj0BAwMgBBQVI8rjiEceQ8wo8WslAUwDeoacqkFnxIGjOtowPqqHixcyNxICMacSufQFGDvWj7la4IOh5bfEz0jX0fe3np2WJoz3Nto7BKAU6kgLqY1v6r7eWQJ6+cWAc0DIz2jqx6OoA9+g2ttg8KrnccTMMuTqdSA9yUkBt4WBKvw4lEhg7NiGOvaD5yHSUZ0dqIONiKoFXrqHgCoJVHpWMDiIsfndwBwawtj3pZ/ulRKo8Npb7d+L6uzwI8Ca82dRp0567V0hgemeuqZSGPv3eTWcnT+7vPa8S+IxLVIdbTqI5orEFa89YxIP1RoAznS7a18cc9VcdbRDf787G5pCSR5SIzHvQUJvv+Mqa1BHWzE2vOElbhVKdDLonom3OmomZlUgly2HaBS5cg1i2h2OTajTpzDqt4BSbpT1SdL2IW4QZXEYZT/JYkYJ8uWVEDZLhAVjkK+sdrUUVftx1E+uQkafRG+ynJNMYuzeRWrD65CyybSnTEXW1EEkcu33xTFCq9ZB4TjHJlXzITcKL0nMPYgjElcwNq5H7dkNp7vBMKzbFccIvbo2s/BJk60dzoBy93r/XQLHnLY2du9CnfzDvlHhOOTKNVmXmJhRgqxdNbw0bQ1n+OdZc0wCrU5bq6aD9g0iEWRNHWLqNEfjifK4fokIYd/OXThoDaMrnimyJbXJZPZgKwTGjq36x/I48vkXMzY1Nr2F6r2kfwmFbTN7MctxJpcCGiW6Lp39SYxGsz/cySScP6c/l3ttm6qLF4bb2m1VCgoQ8xdmlWdyCOgZ2iQ2OOkhHqhyOngwCIFctsLNbrgBhgsvO4GsOYl86mnE3aXeBLqloABZXYuYc5/THgm0H/8dnF0EPiZbZTYSQda9hvr2a9SRFlSfzdnz+CLbocSEiajQiMdYSkRRMSJ+L2LBozDGVb3iE7Qf19T9pqPrfrk+IcwFg8BMLOp+XcCH+dcTCPWkJRFWtfR2YFJeJfnjLFCOTS29F10DvJmoYURSbnWU0wBsz4eaANiORTjKdJA9GjjAjX3w1gwswCIUZTpJ7AeeBH7OnSZf/ILWZxlb7Q6yzwOPA8dzIMoPx4FFaH2WZLty0I2u4DYFKMoPTWg9tlUfJzdeeoCF/P8xrN7UYXsxBJxf4+lHp1BL0HEhn5w17b6Eg/wU3F+42oUOdFvwWoVyzlXTTrlp1zFersb1ogNeKTpOJD2MYUfSHLcUi8DqhCBuZhYBz6AvM87D+83Mw8CnwBd4LNsNEYRT6RQC89FBuwz9356CPlOWgIHeHpwBOsxPM/AdAd6h/ReXFpInkkko3AAAAABJRU5ErkJggg==");
        }
        .account-bind {
          background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADUAAAA1CAYAAADh5qNwAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFdUlEQVRogc2afWiVVRzHP+fcO7Zh4mVWbovpluHM2kRC1KElQqX0QsW20DIHUVhghC0tKIgwSoUGapbYcmEoumkvWBYSaUPX8K+cbzPU/bN0qNvsYjq89zn9cZ7d3d3du/u8nMf8wIU99z7P9/f93t3nnPOcc4TVdRqD3AE8DMwGyu1XEVAAhIEY0AtcAM4Ap4F24HcgasqEMBBqHPA8sBiYizbvlhhwGNgB7AKu+jHkJ9RkYBWwFMj3YyKF68A3wFrgrBcB6eGaCLAB/dN5FbOBsPVesfU32PVc4TZUNXAKWIG3n5kbwnadU3ZdxzgNlQd8BjQDha6s+afQrrvZ9pEVJ/dUAbAPmOPLmhnagCfRLWhGsv2n7gFauT0CgfbRivaVkdFCjQf2A9MMmjLBNLSvOzOdkClULvAjUBGAKRNUoG+J3HQfZgrVAMwKypEhZqF9jiBdQ1GNbm0coTpPo1p2o7rOg2V5syclorQMUV2LKJ/q9uoaoCX5jdRQEXS/4KjZVmc6sdZ/4j1MKlIi61e7DXYRuB/oT8iknPAhLvohtafZXCAAy0Ltbcl+3nAK0b4TJIeaBCx3o6a6zrs1EJTmcqB08CB5qLMayHElFYsl/hQVlYTqXoZxEXd2rvYTb2pEdRwboemCHPTg+nUY+k+NB+q8qA3iOJBSw4/HRfS1/qlDj34SoZbgd7TtNJAQ3q7NTj7wAgyFqjGhmhUhsH49gHXgl6Aq1IAOVQBUBVUFSPzkVHsb/N0NysLasR0GBkxXqgIKJDAPCJlWH4YQEI1iHW5FLq1DPrYISiaiTp3Qn6feZ94JAfMkMNOUYkZiMeLrPya0clXiLXXoN0TJRH2Q7j7zzkwJVJpUTIe1eydy6bLEcXxDA/LFZTA+40DbD5VhkjotoyS3dLl5WNsaEY8vQuTlISaVIkrLAikLlEmCejwXAnqvEH+3HvJyIScHLl/COtGBfPqZQEraFITxMFvjiGvXiG/eSGjNWuKfrkNFo4QWPgFjxgRSLomxErdDIycoRfzrRmTtYpCSUP07iJIS1L/XjJdKw1gJ3DQqqRTWT/uQs+YgppTrDvfAz4gZDyHuuttoqQxEJUnPIUYQAvr7EBXTAVBn/0IdP46cv8BomVGISvRDllHEAw8S37YVrlzG2rWT0Mq3TZcYjb4w0IXhCRYxfQayqJj4xgZCb97SQADnJHDMuKwQiAmFhD74CCIR4/JZOCaBo7e6asAclegZz7hvqav9Pq71tRyVTBxoleh56SO+1Zq+8maur494U6Pf8oMcAXoH5yia0Y8gnlEdfxJ76w3frnzSDENPvjuAG/+fFyNcR+dIhLoCbAuikqiaS3jTVkJr1iEmBLq01YTOMWzebx16QdkooSUvQX4+oqgY8ehC0/KDxND+geGhuoAvXEmFs6+Qqr6+oYN/HDQkDjTTsAXtHxg57fw+0ONUSUy+L+s51qYGrNaDWD98i7V/nxHNFHqA95LfSA3Vj148doSors36zaqei1hNX2J9vwduZnkgCIe1pjtWkDIoz7Tmuxl4zYmiOncW9d1ePQfudVJIgJhUhnj2OcS9k91c+Tn2VPMwuQyh8oCD3N4Lb+3AfNJ0RZlWEm8ATwEdwXnyxXG0v7R962gL2ZeARcDJAEz54SSwEO0vLdm2HHSjh09tBk35oQ3tp3u0k5zseOkFFuC2DzPPFtvHqBtDwPk2nhvo1rAGF/2YIXrsustxOD51u+GqBZgKbML0LNRIbtp1ppKy+p4NL1vj+tEd3hR0P2F6PWbA1p1Cmo7VCSZ2ZkaAWvRmxtl435n5B7Ad2I3PaTsToZIZCzyC7rTL0d92MXpNWQIW+vHgAtBpv9qBQxjcQ/sfnf95t8n9mA4AAAAASUVORK5CYII=");
        }
        .account-policy {
          background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADUAAAA1CAYAAADh5qNwAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFIElEQVRogd2aW0wdRRzGfzMHC0qx9CC3A8Y2JkApYDQiFlvb+NBQo9GH1ksNMWptaow+VhNSow8makxMUFv7pEkVo6gxxrYSrNGiRcBKi1DoRUOslLZQPEBSoMCuD7OHw4Fz3dml2C/Z5Mwy8/++j92dy39GGL09OIilwL3A3UChdeUCXiAJmAKGgH7gFNADtACHgVGnRAgHTC0DHgUeB9aixCeKKeAXoA74DBjWEaRj6lZgJ1ANXK8jYg7GgI+BN4E/7QSQNtqkA7WoV2c7zhrCivesFb/W4ksIiZraDHQDL2DvNUsESRZPt8UbN+I1lQK8D9QDOQlJ00eOxbvb0hET8XxTXuBbYI2WNGfQDDyA6kEjItaTygOaWByGQOloQumKiGimMoCDQLGDopxAMUrXTZEqRDKVDOwHSl0Q5QRKUZ9Ecrg/RjL1DlDhliKHUIHSOQ/hTG0GnnNcwtSU4yFROud193N7v3TUuKDfbY8MYzYdxjzWjtn3D0xMQHIywudD3HY7Yv0GuHGZNg1wHlgF+AM35pqqRQ149mGamIcaMb76EibGI9dLTkE+9DBiYxUIoUUJvAu8GCjMNnULcBq4Tie68ck+zB++j7u+qFyLfHqbrrFJoADohdBv6iU0DZkNB8MbuiEVfHmQmjq/zZGfMb75WocWlO6dgULgSWUAZ9GZnA4OMF3zcmiHkJOLfGwrYnUJSKleze4ujE/r4FxfsJ7Hg+e11yE31zY9anafDwwFntRWNGfbxqHGUEO+PDw1uxClZcoQgBCI4hI8Na8g8m8O1p2exmhs0KEHpf8JCL5+W3QjmkePhpRl9ZPqtQuHlBTEU8+Etm//XVcCWD4kasJaqRXq8mW4NBgsezMQBYVRm4gVKyE7O3hjZFhdeqgEvBJYB3i0Qo2PhRSF1xtXM5GZFVI2R7TTFB5gnQTKdSPNQ7zds7Sz8I6JcgmUuRH5KqJMAiuutgqHsVKy8Mtzt+GV2MjWLHKkCaO3x7TdvP8cRsN3MOzH7DgevL80DVG0KmZz8/QpGPbPlMXqEli+HLGxCpGXb1uWMHp7rmBzzme8ugvz7N+2ySMiMxPPG2/bbT0qmbUOSRTm4IDdptExoBV3VKIWWdcS/pVYa5BrCH9JoMNViqQk5LbteGp3I3c8D0luZ6vpkECbmwzijjsRa+6B1FRE+V2ICtfzom0SlfGcdo1i8kpoedqVrNJMdKBJovLSR9xiMY+1Y7a1qt/H2zFbW9yiAuVjZuVb7xqNaWKe7FY/z5wBw3CNCstHwFQdECWf9b/AGMrHjKlLwIeu0V28iPlbK/T3u0YBfITyEbIb+BZqW9LxPtfs6sTs6nQ67GxMofQDoXm/XuCDRCKJzExnJM1FVlbsOqHYy6xJRLhceg+QTTy4cB7jwH4Yd/BzXLIEsel+hC/qvlqICqCIKLl0UGmmz53Qt0B4hDm9d7jMRz2wZ0Hk6GMPYYajSBvZKcCPLO6NtxZgA2GGokg5qnHgQeAP9zRpoROlL+zHHC3xNgBsAk64IEoHJ4AqlL6wiJVN7ENlcJsdFKWDZpSevmiV4kmRDgH3keAY5gL2WjqiHgyB+I/xjKM2jbegxoWFxAWLdwdxzk8TTWZ/gRro3kNtSbqJSYunyOKNG3Yy9H7UZncBapyYsBEjGiasuAUWjz/RAE6czExHjerVqGOmdk9m/grsQ81m/DqCnDA1G2nAetSgXYj6b/tQe8oSMFDLg37gpHW1AD/h4Bna/wD8kloNvJ3H5wAAAABJRU5ErkJggg==");
        }
        .account-order {
          background-image: url("data:image/png;base64,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");
        }
        .account-question {
          background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADUAAAA1CAYAAADh5qNwAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEj0lEQVRogdXaXYhUZRzH8c/Mjq3rC7utSW4SFtH6km43+ZJoRVcFdiG6RUVghKEXEkTkTTcJghkU2IvZm0kilF0WXdRFZam725WFmqJ4Iyax28YaKupMF89RZ9eZceacZzf9wsDsnHP+z++35/zP85z//+SKJw6LyCQ8hEWYmXw60I4CLmIAp3AEh9GDnzAUS0QugqlWPIWnsUQQ3ygX8Qt24Qv8k0VQFlP34FU8h5YsIkZwFjvxBo6lCZBPcUwbtgiXzoviGpLEW53E35KM1xCNmlqJQ1gn3WXWCIVknEPJuHVTr6nxeA+7Ma0hadmZloz7fqLjutSTU+34Gg9mkhaHfVgm3EGrcr0zNR173BiGCDr2CLqqUsvUFHyLORFFxWCOoOu2ajtUM9WMbzBvFETFYJ6QEs2VNlYz9TYWjpaiSCwUdF5DJVMrsXZU5cRjrQq3+5F3vzZhXhjr23YW/sRsDF7+YeSZ2uDmMkTQu6H8h/IzNQNHMa6RiMVNG5WOHkmtKLd4ifzzL5BPs2K7wgV04gTDz9R6DRpCJkNQ2vuz4kfbKBazhBknLK5xdf02BauyRM2/vlGu/da69y/92qe4Y3v43rtfUUl+9ZosZ2wVXsPAZVPPyLjazk1oYcLE+g9oHj7FlHp7FMlirAXP4p3LR3eniRKbUm+P4odbs1yK3YScasfiWMKyUurrVfz047SHL0Z7HkvRFE1VvUycVHVTaf/etFGbsLSA+WkjVKJ0/BgD/RW35R5YcPX73Hnyr6zn3zNXdxg6o7hzB6VSFgnzC+jKEmEkpe+/U+rZV3Fb0ycLhv2dmz3iAWCgP1QnstFVwF2Zw5QzdarcjLghG+TugsjLovzyFSxfETNko7QXpKjW1KJWTlUiN/1OOjpiSphckGJpVItaOVWJ/IpuuY5lMSVMLgiLwXjGGs2p1tZoQycMFYTnkKmxIt4AOTVUEB6yoplqNKfALc1yXffHkvB3QXgGiVZgaTSnQPsUTW++FUvC8QIO4IlYEVPNU3Hz6kABfTEj3gA51VcQKp6XRFrU1ptTuXs7aW2LMWQ5l7CnINSl9wqr9czUm1P5l16W62qLMWQ5e5U9+e4WyVTdOdUSu62F4ONKjWIXNquzVVKL/zGnzgo+rpjqx3YZKrOl/n65S5kqQkqDf2c5/DPBx7Bu4GahLZmqQ1jctDGLoKxcFPRjeN3vBD5oNFpubvzGSO6+uY0esk1SyKRyLf0wbs+oayw5jVlq1NIHhebxzcQ6ZYao3MrZja1joSYCWyW38XKqNbLH4wc3duOtB4/g3MgN1eq754RF7m+jpykTvwv6rjFE7Ub2X3gcB0dBVBYO4jFBX0WuV4k/KSyfGnxAGjX2CXpO1tqpnvbCAB6VYg6LzLZER80XQ6j/NZ5zwhKqW5gXxpLTybhrVMmhkTTaCPpKmOjeFapQo8mFZJxZybh1k6a7NShMeJ3CPHE+RYxanE/idqowsdZDjDcz2/Ck8DLjIunfzNyPz/GlFEbKiWGqnMl4WJi0Zwr/7TuEnnIeReHx4BT+SD49+FHEd2j/A9+4IMzV0ouIAAAAAElFTkSuQmCC");
        }
        .account-delete {
          background-image: url("data:image/png;base64,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");
        }
        .enter {
          display: flex;
          align-items: center;
          margin-left: auto;
          width: 15px;
          height: 20px;
          background-size: contain;
          background-repeat: no-repeat;
          margin-bottom: 8px;
          margin-top: 8px;
          background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAcCAYAAAC+lOV/AAAACXBIWXMAAAsTAAALEwEAmpwYAAABjUlEQVQ4jZXUPWtUQRTG8d/qBi0iGNEExMZKIghpguILedFAsBCxU8HGysrvsGU+g0UqGxFFQRbRIgRUSAiCJiEQgyBGY4gvICoWYjFncVg3ydxp7n3unf95zszhnFqj0ahjEgdxA0sK1w704CpGMIHuKvBP/Ah9AfeqwN9xCt/i2zk8wd4SGF7iDDZCn8XD7P+WMLzCENZDn8Y09pXAMB8BPoU+iSZ2l8CwGNC70IN4jgMlMLyRSvch9ACeYk8J3AowiOXQxzCDvhIY3mMMK6GPYAq9JTC8jQxeZwFe4FAJDJ8xLl0mHEazFCYdYUC6ODhaBYbf/p2/Vq8AduEWroVerQJP4nKmr5ekXccdXEENX6XOa27nvAu3cSn0H1yUar1lnXfifgZuSG071dqwGdyNB1Jt4RfO41m+qVPadWkQDIdejyBz7RvbnXvwOAO/SJfzH9ju3IVHOBF6DaNY6ATmzvulkdMCP4b7pmDufBfH431VGkXLHYkOzv3xXJHG8LZgDk9gFjel/i1afwHqK0zFFyPRdwAAAABJRU5ErkJggg==");
        }
        .label {
          display: flex;
          align-items: center;
          font-size: 20px;
          color: black;
          font-weight: bold;
        }
      }
      .line {
        display: flex;
        align-items: center;
        text-align: center;
        margin-left: 20px;
        margin-right: 20px;
        width: 100%;
        border-bottom: 1px solid #eae1e1;
      }
    }

    .tab-bar {
      display: flex;
      justify-content: space-between;
      background-color: #f1f1f1;
      position: fixed;
      bottom: 0;
      width: 100%;
      box-sizing: border-box;
      height: calc(5% + 40px);
      max-height: 10%;
      .tab {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: 1px solid transparent;
        flex: 1;
        text-decoration: none;
        color: #666;
        padding: 10px;
        box-sizing: border-box;
        text-align: center;
        .tab-icon {
          width: 26px;
          height: 26px;
          background-size: 100% 100%;
          background-repeat: no-repeat;
          margin-bottom: 5px;
        }
        .account {
          background-image: url("data:image/png;base64,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");
        }
        .news {
          background-image: url("data:image/png;base64,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");
        }
        .gift {
          background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAkCAYAAAAD3IPhAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEF0lEQVRYha2XW4hcRRCGv788s2Y1UbzhJaAYUPACqxCFKK4iuhgDXgM+iOKFNXgLXvHJhwVfNPEhigZ9WMmDoILoi8ZbwKBoQFFRFNGVVUQJC1GUsGsys9M+dJ8zfXrOmZ2Z3YKeU9Nd1fV3VZ3qOmrePM4SNAZcAe4EYAb4CPizWHW1ekcB48BZwDzwBfBtl1Skn2GqXoFTgBeAm/xf5SIt4ElgO9AiVu/QjUH31MTwbuB+YLaYi/TVvOXyqs0M+AoY63Hyx4BnK+YngHeALABIaRa4CNyBLqMy0TWkbZLGJCHTHzLdKtMGTE9hOoQJTNtlWh34zpBeQ8qQHOJ1jGsxbseYwQDjTIxdXXqmKEzxCcRk9G89sN9Psw+YA54LazsEd+MK5UnEcYF/FXRbtM+bwAFgFbAJWA0cjO0aEqiE8AxMI4H/ENP+5ATPY/yHAHED4tho7d6I35rozWPaGbwH0lhiF6twVyvij/ZP/FA+9HJYPwbTROAvxLQu8Hsw/Z2ED6SRCEA7ta3WHVdV5KCbA04K4dsIvJcIjAN7A/9DCOMosCHM3QfsTMJ/OvBbtEcDaMWbRp4hGnoiCt/bmKYxXYopl/8e00+BPxfTlfgEB9NfSHsj/XWYpjB9GXlhuhOBjt0My3EpPsUriLOBx4EjgTvDmAHeAD4ADpWdWXBNxIn4erIZuAw4IpJ6F9yWjmLHrhYnJ8IMa/GhcWHMOXgEP0xUlAzHAvBv0Hf4qrsmFYvQvoUvmG0cq8LCP8CvQDtDAv/aXRedAKAtnwsFhq5iKzcNPICPfxO4B3ipulAK4GLga6ARbeaAzx1szBBT+PKdkgGnVZ+yMLAYmGZ4tuokA62tQXmJYEeGdP0SG9SQw2doyQ3VN1V/dE2GGB1OV8kzkBsa0miGClcPSa7MDu+bxQzxM3DO8GCWE5kS/WJIDyE1iyI10MBKWIQ6V8bA4+FMYhY4H7gLOJ4evVuyMILTpwFETj8Cu0gLYj0JOIgvpPvU3rqpT70UVX3XNSxlA4U8t6/iZ6XBCGALcDLQrgUAoJI3GsBnwPvR3AX4nvnwABgU5J/OPfMgcF6l51X7B3zTHYNZj797BqUFD8YbcNW2lsyL1JP9J1JZsg3VOXMYHwKteF6U++yuxRTMPHB1APPxihiNqefZVCRwTgvANwHU8IZrjfaOYqYlIuHovETpVvEbXhWB/KpyXSs1YArP1ICODfbaqtwrlef6zbysYrdlUh8b1Rw8zZkK0QHLfj/iNXjTt0nQ+V7o0lyGoX60smRyDfAo/jt4pQz1Q86D8WHK24gGMLWM/QZeCvQ7EJojsQ2xsGQD1E1RSEXecXWN3k3aItIzSEWYPsF/J2/Gh6r6LGVADWBPIvEd8CL93drCN2G7CdX+f+Ld3126AEJTAAAAAElFTkSuQmCC");
        }
        .support {
          background-image: url("data:image/png;base64,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");
        }
      }
      .actives {
        color: #ff4332;
        background-color: #f4eaa3;
        border-top-color: #ff4332;
        border-top: solid 2px;
      }
    }
    @media screen and (max-height: 720px) {
      .tab-bar {
        .tab {
          .tab-icon {
            width: 24px;
            height: 24px;
          }
          span {
            font-size: 14px;
          }
        }
      }
    }
    @media screen and (max-height: 680px) {
      .tab-bar {
        .tab {
          .tab-icon {
            width: 20px;
            height: 20px;
          }
          span {
            font-size: 12px;
          }
        }
      }
    }
    @media (max-height: 580px) {
      .tab-bar {
        .tab {
          .tab-icon {
            width: 0;
            height: 0;
          }
          span {
            font-size: 16px;
          }
        }
      }
    }
  }

  .the-main-center {
    height: 80%;
    text-align: start;
    overflow-y: scroll;
    .storeValueOrderHead {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      text-align: center;
      margin-bottom: 10px;
      min-height: 50px;
      // line-height: 20px;
      box-shadow: 0 2px 4px rgba(43, 43, 43, 0.1);
      .storeValueOrderHead-number {
        padding-left: 1%;
        width: 25%;
      }
      .storeValueOrderHead-server {
        padding-left: 1%;
        width: 20%;
      }
      .storeValueOrderHead-role {
        padding-left: 1%;
        width: 20%;
      }
      .storeValueOrderHead-money {
        padding-left: 1%;
        width: 20%;
      }
    }
    .the-order-scroll {
      height: calc(100% - 50px);
      overflow-y: scroll;
      .storeValueOrderItem {
        display: flex;
        justify-content: flex-start;
        text-align: center;
        padding: 10px 0 10px 0;
        border-bottom: 1px solid #a4ada4;
        margin: 0 15px 0 15px;
        height: 30px;
        line-height: 30px;
        .storeValueOrderItem-line {
          padding-left: 1%;
          white-space: nowrap; /* 防止文本换行 */
          overflow: hidden; /* 隐藏超出的内容 */
          text-overflow: ellipsis; /* 超出部分显示省略号 */
        }
        .storeValueOrderItem-number {
          width: 25%;
        }
        .storeValueOrderItem-server {
          width: 20%;
        }
        .storeValueOrderItem-role {
          width: 20%;
        }
        .storeValueOrderItem-money {
          width: 20%;
        }
        .storeValueOrderItem-button {
          .order-copy-button {
            background-color: #ff4332;
            color: white;
            padding: 5px 5px;
            border-radius: 4px;
            text-align: center;
            border: none;
            cursor: pointer;
          }
        }
      }
    }
    .questionnaire-door {
      height: 100%;
      .questionnaire-door-title {
        height: 30%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .questionnaire-door-title-son {
          text-align: center;
        }
      }
      .questionnaire-door-explain {
        height: 30%;
        width: 100%;
        position: relative;
        .questionnaire-door-explain-son {
          text-align: center;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%;-50%);
        }
      }
      .questionnaire-door-open {
        height: 40%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .open-questionnaire-button {
          background-color: #ff4332;
          color: white;
          padding: 15px 30vw;
          border-radius: 20px;
          text-align: center;
          border: none;
          cursor: pointer;
        }
      }
    }
    // .the-questionnaire-main {
    //   height: 100%;
    //   .the-questionnaire-list {
    //     height: 88%;
    //     overflow-y: scroll;
    //     padding: 10px 10px;
    //     .the-questionnaire-item {
    //       border-bottom: 1px solid gainsboro;
    //       padding-bottom: 10px;
    //       .the-questionnaire-item-title {
    //         margin: 10px;
    //         .the-questionnaire-item-title-star {
    //           color: #ff4332;
    //         }
    //         .the-questionnaire-item-title-name {
    //           margin-left: 6px;
    //         }
    //       }
    //       .the-questionnaire-item-body {
    //         .the-questionnaire-item-option {
    //           height: 30px;
    //           line-height: 30px;
    //           padding-left: 10px;
    //           padding-right: 10px;

    //           .the-questionnaire-item-option-key {
    //             width: 15px;
    //             height: 15px;
    //           }
    //           .the-questionnaire-item-option-value {
    //             margin-left: 6px;
    //           }
    //           .the-questionnaire-item-option-others {
    //             margin: 0 20px;
    //             height: 30px;
    //             .the-questionnaire-item-option-input {
    //               width: 100%;
    //               height: 26px;
    //             }
    //           }
    //         }
    //         .the-questionnaire-item-other-option {
    //           line-height: 30px;
    //           padding-left: 10px;
    //           padding-right: 10px;
    //           .the-questionnaire-item-option-key {
    //             width: 15px;
    //             height: 15px;
    //           }
    //           .the-questionnaire-item-option-value {
    //             margin-left: 6px;
    //           }
    //           .the-questionnaire-item-option-others {
    //             margin: 0 30px;
    //             height: 30px;
    //             .the-questionnaire-item-option-input {
    //               width: 100%;
    //               height: 26px;
    //             }
    //           }
    //         }
    //       }
    //     }
    //   }
    //   .questionnaire-door-open {
    //     height: 12%;
    //     width: 100%;
    //     display: flex;
    //     justify-content: center;
    //     align-items: center;
    //     .open-questionnaire-button {
    //       background-color: #ff4332;
    //       color: white;
    //       padding: 15px 30vw;
    //       border-radius: 20px;
    //       text-align: center;
    //       border: none;
    //       cursor: pointer;
    //     }
    //   }
    // }

    .information-body {
      overflow-y: scroll;
      height: 100%;
      padding-top: 20px;
      text-align: center;
      padding-left: 10px;
      padding-right: 10px;
      .information-item {
        height: 30px;
        line-height: 30px;
        padding: 10px 10px;
        border-bottom: 1px solid gainsboro;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .information-item-title {
          width: 60%;
        }
        .information-item-time {
          width: 20%;
        }
      }
    }
    .information-detail {
      width: 100%;
      height: 100%;
      overflow-x: hidden;
      overflow-y: scroll;
    }
    .information-detail :global(img) {
      max-width: 100%;
    }
    .gift-bag-list {
      overflow-y: scroll;
      height: 100%;
      text-align: center;
      .gift-bag-item {
        height: 100px;
        line-height: 100px;
        margin: 15px 20px;
        padding: 10px 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #ffffff;
        border-radius: 10px;
        .gift-bag-item-title {
          width: 60%;
          display: flex;
          justify-content: left;
          align-items: center;

          .gift-bag-item-img {
            display: block;
            width: 40%;
            max-width: 100px;
            height: 90%;
          }

          .gift-bag-item-names {
            margin-left: 5%;
            vertical-align: middle;
            line-height: 30px;
            font-size: 14px;
          }
        }
        .gift-bag-item-btns {
          width: 30%;
          .gift-bag-item-accept {
            background-color: #ff4332;
            color: white;
            padding: 8px 25px;
            border-radius: 20px;
            text-align: center;
            border: none;
            cursor: pointer;
          }
          .gift-bag-item-look {
            background-color: #dbdbdb;
            color: white;
            padding: 8px 25px;
            border-radius: 20px;
            text-align: center;
            border: none;
            cursor: pointer;
          }
        }
      }
    }
  }

  @media screen and (max-width: 480px) {
    .user-center {
      .avatar-name {
        .avatar-switch-btn {
          font-size: 13px;
        }
      }
    }
  }
  @media screen and (max-width: 415px) {
    .user-center {
      .avatar-name {
        .avatar {
          margin-right: 15px;
          margin-left: 12px;
        }
        .username-center-title {
          .username {
            font-size: 14px;
          }
        }
        .avatar-switch-btn {
          font-size: 12px;
        }
      }
    }
  }

  @media screen and (max-width: 376px) {
    .user-center {
      .avatar-name {
        .avatar {
          margin-right: 10px;
          margin-left: 10px;
        }
        .username-center-title {
          .username {
            font-size: 13px;
          }
        }
        .avatar-switch-btn {
          width: 72px;
          padding: 6px;
          font-size: 11px;
        }
      }
    }
  }
</style>
