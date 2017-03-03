/// <reference path="../../typings/globals/jquery/index.d.ts" />
var KSDBoxSwatches = (function () {
    var instance;
    function init() {
        function setDOMEvents() {
            //console.log('setDOMEvents');
            $('.grid_menu_tab-container__buttons--big').on('click', function () {
                //console.log('big clicked');
                var currentElm = $(this).closest('.ProductDetails').find('.big-tall-tab-new');
                $(this).parent().find('.gridmenu-button').removeClass('active');
                $(this).addClass('active');
                $(currentElm).find('.big-radio input').click();
                selectionOptionBig(currentElm);
            });
            $('.grid_menu_tab-container__buttons--tall').on('click', function () {
                //console.log('tall clicked');
                var currentElm = $(this).closest('.ProductDetails').find('.big-tall-tab-new');
                $(this).parent().find('.gridmenu-button').removeClass('active');
                $(this).addClass('active');
                $(currentElm).find('.tall-radio input').click();
                selectOptionTall(currentElm);
            });
            // $('span.swatch-2011').on('click', function (event) {
            //     var self = this;
            //     $(this).closest('.ProductDetails').find('.grid-menu-option').removeClass('p_outOfStock p_inStock');
            //     setTimeout(function () {
            //         $(self).closest('.ProductDetails').find('select.select-menu option').each(function () {
            //             var optionValue = $(this).attr('value');
            //             var optionClassName = $(this).attr('class');
            //             $(self).closest('.ProductDetails').find(".grid-menu-option[data-value='" + optionValue + "']").addClass(optionClassName);
            //         });
            //     }, 0);
            // });
        }
        function scaffoldKSDContainer() {
            //console.log('scaffoldKSDContainer');
            var styles = {
                KSD_wrapper: "",
                KSD_button_tab_container: "margin-top: 10px; display: block;",
                KSD_button_tab_container__buttons: "display: block; font-weight: bold;",
                KSD_button: "display: inline-block; padding: .5rem 1rem; cursor: pointer; color: #000; background-color: hsl(299, 0%, 51%);",
                KSD_button_active: "color: #fff; background-color: hsl(299, 49%, 0%);",
                KSD_extra_margin_top: "margin-top: 10px;"
            };
            $('.select-menu').each(function () {
                var tempDoc = document.createDocumentFragment();
                if ($(this).closest('.ProductDetails').find('.big-tall-tab-new').length > 0) {
                    tempDoc =
                        '<div class="KSD_wrapper" style="' + styles.KSD_wrapper + '">' +
                            '<div class="KSD_button_tab_container" style="' + styles.KSD_button_tab_container + '">' +
                            '<div class="KSD_button_tab_container__buttons" style="' + styles.KSD_button_tab_container__buttons + '">' +
                            '<div class="grid_menu_tab-container__buttons--big  gridmenu-button" style="' + styles.KSD_button + '">BIG</div>' +
                            '<div class="grid_menu_tab-container__buttons--tall gridmenu-button" style="' + styles.KSD_button + '">TALL</div>' +
                            '</div>' +
                            '</div>' +
                            '<div class="grid-menu-swatch-block-container"></div>' +
                            '</div>';
                }
                else {
                    tempDoc =
                        '<div class="KSD_wrapper" style="' + styles.KSD_wrapper + '">' +
                            '<div class="grid-menu-swatch-block-container" style="' + styles.KSD_extra_margin_top + '"></div>' +
                            '</div>';
                }
                $(this).closest('.ProductDetails').prepend(tempDoc);
            });
        }
        function populateProductTabSelection() {
            //console.log('populateProductTabSelection');
            $('.ProductDetails').each(function () {
                var tempTabSelection = document.createDocumentFragment();
                tempTabSelection = '';
                $(this).find('select.select-menu option').each(function () {
                    if ($(this).val() != '') {
                        if ($(this).is(":selected")) {
                            tempTabSelection += "<div class='grid-menu-option groupOptionClass" + $(this).attr('optiongroup') + " " + $(this).attr('class') + " active' data-value='" + $(this).val() + "' optiongroup=" + $(this).attr('optiongroup') + ">" + $(this).text() + "</div>";
                        }
                        else {
                            tempTabSelection += "<div class='grid-menu-option groupOptionClass" + $(this).attr('optiongroup') + " " + $(this).attr('class') + "' data-value='" + $(this).val() + "' optiongroup=" + $(this).attr('optiongroup') + ">" + $(this).text() + "</div>";
                        }
                    }
                });
                $(this).find('.grid-menu-swatch-block-container').append(tempTabSelection);
            });
            if ($('.big-tall-tab-new')) {
                for (var i = 0; i < $('.big-tall-tab-new').length; i++) {
                    var currentElm = $('.big-tall-tab-new')[i];
                    if ($(currentElm).find('.big-radio .on').length > 0) {
                        $(currentElm).closest('.ProductDetails').find('.grid_menu_tab-container__buttons--big').addClass('active');
                        selectionOptionBig(currentElm);
                    }
                    else {
                        $(currentElm).closest('.ProductDetails').find('.grid_menu_tab-container__buttons--tall').addClass('active');
                        selectOptionTall(currentElm);
                    }
                }
                ;
            }
        }
        function selectionOptionBig(currentElm) {
            //console.log('selectionOptionBig');
            $(currentElm).closest('.ProductDetails').find('.grid-menu-option.groupOptionClassT').css('display', 'none');
            $(currentElm).closest('.ProductDetails').find('.grid-menu-option.groupOptionClassB').css('display', 'inline-block');
            findUpdatedOption(currentElm);
        }
        function selectOptionTall(currentElm) {
            //console.log('selectOptionTall');
            $(currentElm).closest('.ProductDetails').find('.grid-menu-option.groupOptionClassB').css('display', 'none');
            $(currentElm).closest('.ProductDetails').find('.grid-menu-option.groupOptionClassT').css('display', 'inline-block');
            findUpdatedOption(currentElm);
        }
        function bindTabSelection() {
            //console.log('bindTabSelection');
            $('.grid-menu-option').on('click', function () {
                var selectedOptionValue = $(this).attr('data-value');
                $(this).closest('.ProductDetails').find('.grid-menu-option').removeClass('active');
                $(this).addClass('active');
                $(this).closest('.ProductDetails').find('select.select-menu option[selected="selected"]').removeAttr('selected');
                $(this).closest('.ProductDetails').find('select.select-menu option[value="' + selectedOptionValue + '"]').attr('selected', 'selected');
                $(this).closest('.ProductDetails').find('select.select-menu').trigger('change');
            });
        }
        function findUpdatedOption(currentElm) {
            //console.log('findUpdatedOption');
            $(currentElm).next('.ProductDetails').find('select.select-menu option[selected="selected"]').removeAttr('selected');
            $(currentElm).next('.ProductDetails').find('.grid-menu-option').removeClass('active');
        }
        (function getStarted() {
            scaffoldKSDContainer();
            setDOMEvents();
            populateProductTabSelection();
            bindTabSelection();
        })();
        return {};
    }
    ;
    return {
        getInstance: function () {
            if (!instance) {
                instance = init();
            }
            return instance;
        }
    };
})();
$(window).on('load', function () {
    var KDSV2Swatches = KSDBoxSwatches.getInstance();
});
