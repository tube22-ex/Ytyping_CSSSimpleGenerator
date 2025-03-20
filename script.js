class EventManager {
    constructor() {
        this.arr = {};

        this.textElement();
        // すべてのチェックボックスを取得
        this.checkboxes = document.querySelectorAll('input[name="text_Select_check"]');

        // チェックボックスのいずれかがクリックされたときのイベントリスナーを追加
        this.checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', this.handleCheckboxChange.bind(this));
        });

        this.color_picker = document.getElementById('color_picker');
        this.color_picker.addEventListener('input', this.handleColorChange.bind(this));
        this.color = '#000000';
        this.HEX_color = document.getElementById('HEX_color');

        this.generate_button = document.getElementById('generate_button');
        this.generate_button.addEventListener('click', this.generate_css.bind(this));

        this.result_text = document.getElementById('result_text');
        this.result = document.getElementById('result');
        this.checkedInfo = [];
        this.changeArr = [];

        this.nameToSelectorMap = {
            'lyrics_input': '#lyrics',
            'kana_input': '#main_word > .word',
            'roma_input': '#sub_word > .word',
            'kana_correct': '#main_word > .word-correct',
            'roma_correct': '#sub_word > .word-correct',
            'kana_completed': '#main_word > .word-completed',
            'roma_completed': '#sub_word > .word-completed',
            'kana_next' : '#main_word > .word-next',
            'roma_next' : '#sub_word > .word-next'
        };
    
    }

    generate_css() {
        const color = this.color;//今のところ固定
        const css = this.Template(this.changeArr, color);
        const textarea = this.generateTextarea();
        textarea.value = css;
    }

    Template(element, color, mode = 'color') {
        let css = '';
        const id = element.map(e => `${this.convert(e)}`).join(',');
        if (mode == 'color') {
            css = `${id}{
    color : ${color};
}`;
        }
        return css;
    }

    generateTextarea() {
        const r_id = document.querySelectorAll('.textarea').length;
        this.result.insertAdjacentHTML("afterbegin", `<textarea name="" class="textarea" id="result_text${r_id}" cols="30" rows="10"></textarea>`);
        const textarea = document.getElementById(`result_text${r_id}`);
        return textarea;
    }

    textElement() {
        this.arr["kana_input"] = document.getElementById('kana_input');
        this.arr["roma_input"] = document.getElementById('roma_input');
        this.arr["lyrics_input"] = document.getElementById('lyrics_input');
        this.arr["kana_correct"] = document.getElementById('kana_correct');
        this.arr["roma_correct"] = document.getElementById('roma_correct');
        this.arr["lyrics_correct"] = document.getElementById('lyrics_correct');
        this.arr["kana_completed"] = document.getElementById('kana_completed');
        this.arr["roma_completed"] = document.getElementById('roma_completed');
        this.arr["lyrics_completed"] = document.getElementById('lyrics_completed');
        this.arr["kana_next"] = document.getElementById('kana_next');
        this.arr["roma_next"] = document.getElementById('roma_next');
    }

    handleCheckboxChange() {
        // チェックされているチェックボックスを取得
        const checkedCheckboxes = document.querySelectorAll('input[name="text_Select_check"]:checked');

        // チェックされているチェックボックスの情報を取得
        this.checkedInfo = [];
        checkedCheckboxes.forEach(checkedCheckbox => {
            const label = checkedCheckbox.parentNode; // チェックボックスの親要素であるlabelを取得
            const labelText = label.textContent; // labelのテキストを取得
            const checkboxId = checkedCheckbox.id; // チェックボックスのidを取得
            const checkboxValue = checkedCheckbox.value; // チェックボックスのvalueを取得（今回は空）

            this.checkedInfo.push({
                id: checkboxId,
                text: labelText,
                value: checkboxValue
            });
        });

        this.changeArr = [];
        this.checkedInfo.forEach((e) => {
            const elementID = e.id.replace('_check', '');
            this.changeArr.push(
                elementID
            )
        })

        console.log("チェックされているチェックボックスの情報:", this.checkedInfo);
    }

    handleColorChange() {
        this.color = this.color_picker.value;
        this.HEX_color.textContent = this.color;
        this.HEX_color.style.color = this.color;

        this.changeArr.forEach((e) => {
            this.arr[e].style.color = this.color;
        })
    }

    convert(name){
        return this.nameToSelectorMap[name] || '';
    }
}

// EventManager クラスのインスタンスを作成
const eventManager = new EventManager();
