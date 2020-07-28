$(function () {
    $('.naviBtn').on('click', function () {
        if ($(this).hasClass('show')) {
            $('.naviBtn, .naviWrap,#usernameButton, .namesetting,#facialEmotionSettingButton, .facialEmotionSetting,#colorSettingButon, .colorSetting').removeClass('show');
        }
        else {
            $('.naviBtn, .naviWrap').addClass('show');
        }
    }
    )

    $('#usernameButton').on('click', function () {
        if ($(this).hasClass('show')) {
            $('#usernameButton, .namesetting').removeClass('show');
        }
        else {
            $('#usernameButton, .namesetting').addClass('show');
            $('#facialEmotionSettingButton, .facialEmotionSetting,#colorSettingButon, .colorSetting').removeClass('show');
        }
    }
    )

    $('#facialEmotionSettingButton').on('click', function () {
        if ($(this).hasClass('show')) {
            $('#facialEmotionSettingButton, .facialEmotionSetting').removeClass('show');
        }
        else {
            $('#facialEmotionSettingButton, .facialEmotionSetting').addClass('show');
            $('#usernameButton, .namesetting,#colorSettingButon, .colorSetting').removeClass('show');
        }
    }
    )

    $('#colorSettingButon').on('click', function () {
        if ($(this).hasClass('show')) {
            $('#colorSettingButon, .colorSetting').removeClass('show');
        }
        else {
            $('#colorSettingButon, .colorSetting').addClass('show');
            $('#usernameButton, .namesetting, #facialEmotionSettingButton, .facialEmotionSetting').removeClass('show');
        }
    }
    )

    $('.fontColor').on('click', function () {
        if ($(this).hasClass('white')) {
            $('.fontColor, .messages').removeClass('White');
            $('.fontColor, .messages').addClass('Black');
            $(".messages").css("color", "#000");
        }
        else {
            $('.fontColor, .messages').removeClass('Black');
            $('.fontColor, .messages').addClass('White');
            $(".messages").css("color", "#fff");
        }
    }
    )
});