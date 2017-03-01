/// <reference path="../../typings/globals/jquery/index.d.ts" />

var KSDBoxSwatches = (() => {

        var instance;

        function init() {

            function setDOMEvents() {
                //console.log('setDOMEvents');

                $('.KSD_button_tab-container__buttons--big').on('click', function () {
                    //console.log('big clicked');
                    var currentElm = $(this).closest('.KSDItemContainer').find('.big-tall-tab-new');
                    $(this).parent().find('.KSD-button').removeClass('active');
                    $(this).addClass('active');
                    $(currentElm).find('.big-radio input').click();
                    selectionOptionBig(currentElm);
                });
                $('.KSD_button_tab-container__buttons--tall').on('click', function () {
                    //console.log('tall clicked');
                    var currentElm = $(this).closest('.KSDItemContainer').find('.big-tall-tab-new');
                    $(this).parent().find('.KSD-button').removeClass('active');
                    $(this).addClass('active');
                    $(currentElm).find('.tall-radio input').click();
                    selectOptionTall(currentElm);
                });
                $('span.swatch-2011').on('click', function (event) {
                    var self = this;
                    $(this).closest('.KSDItemContainer').find('.KSD-select-option').removeClass('p_outOfStock p_inStock');
                    setTimeout(function () {
                        $(self).closest('.KSDItemContainer').find('.selectionHolder select.size option').each(function () {
                            var optionValue = $(this).attr('value');
                            var optionClassName = $(this).attr('class');
                            $(self).closest('.KSDItemContainer').find(".KSD-select-option[data-value='" + optionValue + "']").addClass(optionClassName);
                        });
                    }, 0);

                });
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


                $('.KSDItemContainer .selectionHolder .size').each(function () {
                    var tempDoc = document.createDocumentFragment();

                    if ($(this).closest('.KSDItemContainer').find('.big-tall-tab-new').length > 0) {

                        tempDoc =
                            '<div class="KSD_wrapper" style="' + styles.KSD_wrapper + '">' +
                            '<div class="KSD_first_option_text select_size_color_label select-skip-count">' + $(this).closest('.KSDItemContainer').find(".select_size_color_label.select-size-label").text() + '</div>' +
                            '<div class="KSD_button_tab_container" style="' + styles.KSD_button_tab_container + '">' +
                            '<div class="KSD_button_tab_container__buttons" style="' + styles.KSD_button_tab_container__buttons + '">' +
                            '<div class="KSD_button_tab-container__buttons--big  KSD-button" style="' + styles.KSD_button + '">BIG</div>' +
                            '<div class="KSD_button_tab-container__buttons--tall KSD-button" style="' + styles.KSD_button + '">TALL</div>' +
                            '</div>' +
                            '</div>' +
                            '<div class="KSD-swatch-block-container"></div>' +
                            '</div>'
                        ;
                    }
                    else {
                        tempDoc =
                            '<div class="KSD_wrapper" style="' + styles.KSD_wrapper + '">' +
                            '<div class="KSD_first_option_text select_size_color_label select-skip-count">' + $(this).closest('.KSDItemContainer').find(".select_size_color_label.select-size-label").text() + '</div>' +
                            '<div class="KSD-swatch-block-container" style="' + styles.KSD_extra_margin_top + '"></div>' +
                            '</div>'
                        ;
                    }
                    $(this).closest('.ProductDetails').prepend(tempDoc);
                    
                });
            }

            function populateProductTabSelection() {
                //console.log('populateProductTabSelection');
                $('.ProductDetails').each(function () {

                    var tempTabSelection = document.createDocumentFragment();
                    tempTabSelection = '';
                    $(this).find('.selectionHolder select.size option').each(function () {
                        if ($(this).val() != '') {
                            if ($(this).is(":selected")) {
                                tempTabSelection += "<div class='KSD-select-option groupOptionClass" + $(this).attr('optiongroup') + " " + $(this).attr('class') + " active' data-value='" + $(this).val() + "' optiongroup=" + $(this).attr('optiongroup') + ">" + $(this).text() + "</div>";
                            }
                            else {
                                tempTabSelection += "<div class='KSD-select-option groupOptionClass" + $(this).attr('optiongroup') + " " + $(this).attr('class') + "' data-value='" + $(this).val() + "' optiongroup=" + $(this).attr('optiongroup') + ">" + $(this).text() + "</div>";
                            }
                        }
                    });
                    $(this).find('.KSD-swatch-block-container').append(tempTabSelection);
                });
                if ($('.big-tall-tab-new')) {

                    for (var i = 0; i < $('.big-tall-tab-new').length; i++) {
                        var currentElm = $('.big-tall-tab-new')[i];
                        if ($(currentElm).find('.big-radio .on').length > 0) {
                            $(currentElm).closest('.KSDItemContainer').find('.KSD_button_tab-container__buttons--big').addClass('active');
                            selectionOptionBig(currentElm);
                        }
                        else {
                            $(currentElm).closest('.KSDItemContainer').find('.KSD_button_tab-container__buttons--tall').addClass('active');
                            selectOptionTall(currentElm);
                        }
                    };
                }
            }

            function selectionOptionBig(currentElm) {
                //console.log('selectionOptionBig');
                $(currentElm).closest('.KSDItemContainer').find('.KSD-select-option.groupOptionClassT').css('display', 'none');
                $(currentElm).closest('.KSDItemContainer').find('.KSD-select-option.groupOptionClassB').css('display', 'inline-block');
                findUpdatedOption(currentElm);
            }

            function selectOptionTall(currentElm) {
                //console.log('selectOptionTall');
                $(currentElm).closest('.KSDItemContainer').find('.KSD-select-option.groupOptionClassB').css('display', 'none');
                $(currentElm).closest('.KSDItemContainer').find('.KSD-select-option.groupOptionClassT').css('display', 'inline-block');
                findUpdatedOption(currentElm);
            }

            function bindTabSelection() {
                //console.log('bindTabSelection');
                $('.KSD-select-option').on('click', function () {
                    var selectedOptionValue = $(this).attr('data-value');

                    $(this).closest('.KSDItemContainer').find('.KSD-select-option').removeClass('active');
                    $(this).addClass('active');
                    $(this).closest('.KSDItemContainer').find('.selectionHolder select.size option[selected="selected"]').removeAttr('selected');
                    $(this).closest('.KSDItemContainer').find('.selectionHolder select.size option[value="' + selectedOptionValue + '"]').attr('selected', 'selected');
                    $(this).closest('.KSDItemContainer').find('.selectionHolder select.size').trigger('change');
                });
            }

            function findUpdatedOption(currentElm) {
                //console.log('findUpdatedOption');
                $(currentElm).next('.ProductDetails').find('.selectionHolder select.size option[selected="selected"]').removeAttr('selected');
                $(currentElm).next('.ProductDetails').find('.KSD-select-option').removeClass('active');
            }

            (function getStarted() {
                scaffoldKSDContainer();
                setDOMEvents();
                populateProductTabSelection();
                bindTabSelection();
            })();

            return {
                //setDesign: getStarted
            };
        };

        return {
            getInstance: function () {
                if (!instance) {
                    instance = init();
                }
                return instance;
            }
        };

    })();

    $(window).on('load',()=> {
        var KDSV2Swatches = KSDBoxSwatches.getInstance();
    });