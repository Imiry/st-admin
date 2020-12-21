/*
 * @tableData 表格数据
 */
import {
    checkStrong,
    pwdLength830,
    pwdLength610
} from '@utils/mUtils.js';
export default {
    data() {
        return {
            pwdLevel: 0,
            pwdLength: null,
            safeMsg: '',
            lowBgColor: '#dcdcdc',
            midBgColor: '#dcdcdc',
            highBgColor: '#dcdcdc',
            password: this.value,
            visible: false,
        }
    },
    props: {
        value: {
            type: String,
            required: '',
            default: ''
        },
        pwdLengthRange: {
            type: String,
            required: '',
            default: '8~30'
        },
    },
    watch: {
        'password'(newVal, oldVal) {
            this.pwdLevel = checkStrong(newVal);
            if (this.pwdLengthRange == '8~30') {
                this.pwdLength = pwdLength830(newVal);
            } else if (this.pwdLengthRange == '6~10') {
                this.pwdLength = pwdLength610(newVal)
            }

            if (this.pwdLevel == 2) {
                this.safeMsg = this.$i18n.t('form.weak');
                this.lowBgColor = '#ff460f';
                this.midBgColor = '#dcdcdc';
                this.highBgColor = '#dcdcdc';
            } else if (this.pwdLevel == 3) {
                this.safeMsg = this.$i18n.t('form.moderate');
                this.lowBgColor = '#ff6a00';
                this.midBgColor = '#ff6a00';
                this.highBgColor = '#dcdcdc';
            } else if (this.pwdLevel == 4) {
                this.safeMsg = this.$i18n.t('form.strong');
                this.lowBgColor = '#0a9e00';
                this.midBgColor = '#0a9e00';
                this.highBgColor = '#0a9e00'
            } else {
                this.lowBgColor = '#dcdcdc';
                this.midBgColor = '#dcdcdc';
                this.highBgColor = '#dcdcdc';
            }
        }
    },
    methods: {
        sendPwd() {
            this.$emit('input', this.password)
        },
        resetPwd() {
            this.password = '';
        },
    }
}
