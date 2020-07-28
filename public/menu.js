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
});