export default {
    en: {
        bottomMenu: {
            join: "Join",
            claim: "Claim",
            put: "Put ",
            cancel: "Cancel ",
            getReward: "Get Reward",
            farmingSettings: {
                title: "Farming Settings",
                p1: "Add PILE from your balance to farming. In return, you will start receiving tiles. The more PILE you lock, the more tiles you receive. You can always release tokens from farming by clicking the (x) icon.",
                p2: "Current balance: ",
                p3: "In farming: ",
                p4: "Add this amount of PILE to farming:",
                placeholderBalance: "Your balance",
                error: "Please leave 1 PILE on balance for put operations. Additionally, the value should be less than your balance value.",
                youGet: "Then you'll farm approximately:",
                tileMin: "tiles/minute.",
                addToFarming: "Add to Farming"
            }
        },
        home: {
            remainingTiles: "Remaining:",
            yourPoints: "Your Points:",
            totalReward: "Total Reward:"
        },
        topMenu: {
            balance: "Balance: ",
            yourPlace: "Your Place: ",
            standings: {
                place: "Place",
                wallet: "Wallet",
                points: "Points",
                reward: "Reward",
                title: "Standings"
            },
            getTokens: {
                title: "Get PILE Tokens!",
                p1: "To get PILE tokens, add the PILE token root address to FlatQube and swap for WEVER.",
                p2: "Your connected wallet is: ",
                p3: "Keep PILE only in this wallet to use them within the game!",
                p4: "For the guide on how to import the PILE token, see "
            }
        },
        toast: {
            anotherColorTitle: "Choose Another Color!",
            anotherColorText1: "Please choose color ",
            anotherColorText2: "from the bottom menu.",
            noColorLeftTitle: "Use Another Color!",
            noColorLeftText1: "Unfortunately, 0 tiles of color ",
            noColorLeftText2: " left.",
            noColorLeftText3: "Please <b>choose</b> another color from the bottom menu<br/>",
            noColorLeftText4: "or <b>CLAIM</b> more tiles.",
            tilesLimitReachedTitle: "Tiles Limit Reached!",
            tilesLimitReachedText1: "You have already reached the limit of <b>50 tiles</b>, please submit them before putting more tiles.",
            putBalanceNotEnoughTitle: "Your PILE balance is not enough to put!",
            putBalanceNotEnoughText1: "Currently you have <i>{balance} PILE</i>, and the put operation costs <b>{payPerMove} PILE</b>.<br/>Please top-up your balance!",
            noTilesToClaimTitle: "You have 0 tiles to claim!",
            noTilesToClaimText1: "Please click the <span class=\"p-1\"><i class=\"bi bi-gear-fill dark-box color-primary\"></i></span> and add a few PILE tokens to farming.",
            noTilesToClaimText2: "<b>NOTE:</b> The more PILE you put to farming, the <b>more</b> you receive!",
            zeroBalanceTitle: "Your Balance is 0 PILE!",
            zeroBalanceText1: "Your balance is <b>0 PILE</b>. Please top-up your balance by clicking the <span class=\"dark-box p-1\"><i class=\"bi bi-cart-check-fill color-success\"></i></span> icon.",
            operationInProgressTitle: "Operation in Progress!",
            operationInProgressText1: "Please wait until the app completes the claim or put operation.",
            operationFailedTitle: "Operation Didn't Succeed!",
            operationFailedText1: "The operation could not be completed, please try again.",
            activityDetectedTitle: "👾 Activity Detected!",
            activityDetectedPut: "Somebody has just put <b>{putValue} tiles</b>.",
            activityDetectedClaim: "Somebody has just claimed <b>{claimValue} tiles</b>.",
            starReceivedTitle: "⭐ You've Received a STAR! ⭐",
            starReceivedText1: "This ⭐star⭐ gives you  <b>+{pointsGained}</b> points!.",
        }
    }
}
