document.addEventListener("DOMContentLoaded", function () {
    /**
     * HomePage - Help section
     */
    class Help {
        constructor($el) {
            this.$el = $el;
            this.$buttonsContainer = $el.querySelector(".help--buttons");
            this.$slidesContainers = $el.querySelectorAll(".help--slides");
            this.currentSlide = this.$buttonsContainer.querySelector(".active").parentElement.dataset.id;
            this.init();
        }

        init() {
            this.events();
        }

        events() {
            /**
             * Slide buttons
             */
            this.$buttonsContainer.addEventListener("click", e => {
                if (e.target.classList.contains("btn")) {
                    this.changeSlide(e);
                }
            });

            /**
             * Pagination buttons
             */
            this.$el.addEventListener("click", e => {
                if (e.target.classList.contains("btn") && e.target.parentElement.parentElement.classList.contains("help--slides-pagination")) {
                    this.changePage(e);
                }
            });
        }

        changeSlide(e) {
            e.preventDefault();
            const $btn = e.target;

            // Buttons Active class change
            [...this.$buttonsContainer.children].forEach(btn => btn.firstElementChild.classList.remove("active"));
            $btn.classList.add("active");

            // Current slide
            this.currentSlide = $btn.parentElement.dataset.id;

            // Slides active class change
            this.$slidesContainers.forEach(el => {
                el.classList.remove("active");

                if (el.dataset.id === this.currentSlide) {
                    el.classList.add("active");
                }
            });
        }

        /**
         * TODO: callback to page change event
         */
        changePage(e) {
            e.preventDefault();
            const page = e.target.dataset.page;

            console.log(page);
        }
    }

    const helpSection = document.querySelector(".help");
    if (helpSection !== null) {
        new Help(helpSection);
    }

    // Donation list
    var tds = document.querySelectorAll("td.pick-up-donation");
    console.log(tds);

    for (var i = 0; i < tds.length; i++) {
        if (tds[i].innerText === 'Odebrane, dziękujemy!') {
            tds[i].parentElement.style.color = '#acacac';
            tds[i].parentElement.style.backgroundColor = '#FFF'
        }
    }

    /**
     * Form Select
     */
    class FormSelect {
        constructor($el) {
            this.$el = $el;
            this.options = [...$el.children];
            this.init();
        }

        init() {
            this.createElements();
            this.addEvents();
            this.$el.parentElement.removeChild(this.$el);
        }

        createElements() {
            // Input for value
            this.valueInput = document.createElement("input");
            this.valueInput.type = "text";
            this.valueInput.name = this.$el.name;

            // Dropdown container
            this.dropdown = document.createElement("div");
            this.dropdown.classList.add("dropdown");

            // List container
            this.ul = document.createElement("ul");

            // All list options
            this.options.forEach((el, i) => {
                const li = document.createElement("li");
                li.dataset.value = el.value;
                li.innerText = el.innerText;

                if (i === 0) {
                    // First clickable option
                    this.current = document.createElement("div");
                    this.current.innerText = el.innerText;
                    this.dropdown.appendChild(this.current);
                    this.valueInput.value = el.value;
                    li.classList.add("selected");
                }

                this.ul.appendChild(li);
            });

            this.dropdown.appendChild(this.ul);
            this.dropdown.appendChild(this.valueInput);
            this.$el.parentElement.appendChild(this.dropdown);
        }

        addEvents() {
            this.dropdown.addEventListener("click", e => {
                const target = e.target;
                this.dropdown.classList.toggle("selecting");

                // Save new value only when clicked on li
                if (target.tagName === "LI") {
                    this.valueInput.value = target.dataset.value;
                    this.current.innerText = target.innerText;
                }
            });
        }
    }

    document.querySelectorAll(".form-group--dropdown select").forEach(el => {
        new FormSelect(el);
    });

    /**
     * Hide elements when clicked on document
     */
    document.addEventListener("click", function (e) {
        const target = e.target;
        const tagName = target.tagName;

        if (target.classList.contains("dropdown")) return false;

        if (tagName === "LI" && target.parentElement.parentElement.classList.contains("dropdown")) {
            return false;
        }

        if (tagName === "DIV" && target.parentElement.classList.contains("dropdown")) {
            return false;
        }

        document.querySelectorAll(".form-group--dropdown .dropdown").forEach(el => {
            el.classList.remove("selecting");
        });
    });

    /**
     * Switching between form steps
     */
    class FormSteps {
        constructor(form) {
            this.$form = form;
            this.$next = form.querySelectorAll(".next-step");
            this.$prev = form.querySelectorAll(".prev-step");
            this.$step = form.querySelector(".form--steps-counter span");
            this.currentStep = 1;

            this.$stepInstructions = form.querySelectorAll(".form--steps-instructions p");
            const $stepForms = form.querySelectorAll("form > div");
            this.slides = [...this.$stepInstructions, ...$stepForms];

            this.init();
        }

        /**
         * Init all methods
         */
        init() {
            this.events();
            this.updateForm();
        }

        /**
         * All events that are happening in form
         */
        events() {
            // Next step
            this.$next.forEach(btn => {
                btn.addEventListener("click", e => {
                    e.preventDefault();
                    this.currentStep++;
                    this.updateForm();
                });
            });

            // Previous step
            this.$prev.forEach(btn => {
                btn.addEventListener("click", e => {
                    e.preventDefault();
                    this.currentStep--;
                    this.updateForm();
                });
            });

            // Form submit
            // this.$form.querySelector("form").addEventListener("submit", e => this.submit(e));
        }

        /**
         * Update form front-end
         * Show next or previous section etc.
         */
        updateForm() {
            this.$step.innerText = this.currentStep;

            // institutions step 3/5
            if (this.currentStep === 3) {

                // all institutions
                var inst = document.querySelectorAll("div.institution");
                // institution's category
                var categories = document.querySelectorAll("span.category-id");
                // checkbox step 1
                var checkedCategories = document.querySelectorAll('input.category-checkbox');

                // array with categories id from step 1/5
                var checkedCategoriesStepOne = [];
                // categories for institutions
                var categoryResultTemp = [];
                var categoryResultFinal = [];

                for (var a = 0; a < categories.length; a++) {
                    categoryResultTemp.push(categories[a].innerText)
                }
                for (var b = 0; b < checkedCategories.length; b++) {
                    if (checkedCategories[b].checked) {
                        checkedCategoriesStepOne.push(checkedCategories[b].value)
                    }
                }
                for (var c = 0; c < categoryResultTemp.length; c++) {
                    categoryResultFinal.push(categoryResultTemp[c].split(''))
                }

                function arrayContainsArray(firstArray, secondArray) {
                    if (0 === secondArray.length) {
                        return false;
                    }
                    return secondArray.every(function (value) {
                        return (firstArray.indexOf(value) >= 0);
                    });
                }

                for (var d = 0; d < categoryResultFinal.length; d++) {
                    if (arrayContainsArray(categoryResultFinal[d], checkedCategoriesStepOne)) {
                        inst[d].style.display = ""
                    }
                }

                console.log(categoryResultTemp);
                console.log(categoryResultFinal);
                console.log(checkedCategoriesStepOne)

            }

            // TODO: Validation

            this.slides.forEach(slide => {
                slide.classList.remove("active");

                if (slide.dataset.step == this.currentStep) {
                    slide.classList.add("active");
                }
            });

            this.$stepInstructions[0].parentElement.parentElement.hidden = this.currentStep >= 6;
            this.$step.parentElement.hidden = this.currentStep >= 6;

            // TODO: get data from inputs and show them in summary

            var btn = document.getElementById("btn-step-4");
            btn.addEventListener("click", function (event) {

                // checked categories
                var categories = document.querySelectorAll('input.category-checkbox');
                var checkedCategoriesName = "";
                for (var i = 0; i < categories.length; i++) {
                    if (categories[i].checked) {
                        checkedCategoriesName += categories[i].nextElementSibling.nextElementSibling.innerText + " "
                    }
                }
                // numer of bags
                var numberOfBags = document.getElementById("bags").value;
                // checked institution
                var institutions = document.querySelectorAll("input.institution");
                var checkedInstitution = "";
                for (var ii = 0; ii < institutions.length; ii++) {
                    if (institutions[ii].checked) {
                        checkedInstitution += institutions[ii].nextElementSibling.nextElementSibling.firstElementChild.innerText
                    }
                }

                // all pick-up details
                var address = document.getElementById("address").value;
                var city = document.getElementById("city").value;
                var postcode = document.getElementById("postcode").value;
                var phone = document.getElementById("phone").value;
                var data = document.getElementById("data").value;
                var time = document.getElementById("time").value;
                var moreInfo = document.getElementById("more-info").value;

                // info bags and institution
                var summary = document.querySelectorAll("span.summary--text");
                summary[0].innerText = `${numberOfBags} worki - ${checkedCategoriesName}`;
                summary[1].innerText = `Dla ${checkedInstitution}`;

                // left col
                var pickUpInfo = document.querySelectorAll("ul#pick-up-info>li");
                pickUpInfo[0].innerText = address;
                pickUpInfo[1].innerText = city;
                pickUpInfo[2].innerText = postcode;
                pickUpInfo[3].innerText = phone;

                // right col
                var pickUpTime = document.querySelectorAll("ul#pick-up-time>li");
                pickUpTime[0].innerText = data;
                pickUpTime[1].innerText = time;
                pickUpTime[2].innerText = moreInfo;
            });
        }

        /**
         * Submit form
         *
         * TODO: validation, send data to server
         */
        submit(e) {
            e.preventDefault();
            this.currentStep++;
            this.updateForm();
        }
    }

    const form = document.querySelector(".form--steps");
    if (form !== null) {
        new FormSteps(form);
    }


});
