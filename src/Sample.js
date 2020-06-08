import React from 'react'

// formik & yup
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

// formik-material-ui
import {
    TextField,
    Checkbox,
    RadioGroup,
    Select,
} from 'formik-material-ui'

// material-ui/core
import {
    Button,
    LinearProgress,
    FormControlLabel,
    FormControl,
    FormHelperText,
    FormGroup,
    FormLabel,
    Radio,
    InputLabel,
    MenuItem,
} from '@material-ui/core'

// DateTimePickerを使う場合は以下をimport
import {
    KeyboardDatePicker,
} from 'formik-material-ui-pickers'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import ja from 'date-fns/locale/ja'
import format from 'date-fns/format'
import DateFnsUtils from '@date-io/date-fns'

// スタイル
const myStyle = {
    padding: '10px'
}

// リスト（Select用）
const list = [
    {'id': '', 'name': '(未選択)'},
    {'id': '1', 'name': 'Aさん'},
    {'id': '2', 'name': 'Bさん'},
    {'id': '3', 'name': 'Cさん'},
]

// 選択肢のリスト（Checkbox用）
const list2 = [
    {'name': 'myCheck1', 'label': 'Aさん'},
    {'name': 'myCheck2', 'label': 'Bさん'},
    {'name': 'myCheck3', 'label': 'Cさん'},
]

// 選択肢のリスト（Radio用）
const list3 = [
    {'value': 'D', 'label': 'Dさん'},
    {'value': 'E', 'label': 'Eさん'},
    {'value': 'F', 'label': 'Fさん'},
]

// 初期値
const initValues = {
    myText: 'aaaa',
    myPass: 'bbbb',
    mySelect: '1',
    myCheck1: true,
    myCheck2: false,
    myCheck3: true,
    myRadio: '',
    myDate: null,
    // myTime: null,
    // myDateTime: null,
}

// バリデーションスキーマ
const validationSchema = Yup.object().shape({
    myText: Yup.string()
        .min(4, '短すぎます')
        .max(10, '長すぎます')
        .required('入力してください'),
    myPass: Yup.string()
        .min(4, '短すぎます')
        .max(10, '長すぎます')
        .required('入力してください'),
    mySelect: Yup.string()
        .required('選択してください'),
    myCheck: Yup.string()
        .test('check-test', 'チェックしてください', function(value) {
            if ((this.parent.myCheck1 === false) &&
                (this.parent.myCheck2 === false) &&
                (this.parent.myCheck3 === false)) {
                return false
            } else {
                return true
            }
        }),
    myRadio: Yup.string()
        .required('選択してください')
        .test('radio-test', 'Dさんはチェックしないでください', function(value) {
            if (this.parent.myRadio === 'D') {
                return false
            } else {
                return true
            }
        }),
    myDate: Yup.date()
        .nullable()
        .required('入力してください'),
    // .required('入力してください'),
    // .min(new Date(2020, 1, 1), '範囲外です')
        // .max(new Date(2020, 12, 31), '範囲外です'),
    // myTime: Yup.date()
        // .required('選択してください')
    // myDateTime: Yup.date()
        // .required('選択してください')
        // .min(new Date(2020, 1, 1, 0, 0, 0), '範囲外です')
        // .max(new Date(2020, 12, 31, 23, 59, 59), '範囲外です'),
})

// ボタンクリック時
const onSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
        // ボタン連打を防ぐため？に自動的にEnabled=falseがかかるっぽいので
        // 以下を記述して有効化する必要がある
        setSubmitting(false);
        const ymd = values.myDate ? format(values.myDate, 'yyyy-MM-dd') : ""
        alert(
            "myText: " + values.myText + "\n" + 
            "myPass: " + values.myPass + "\n" + 
            "mySelect: " + values.mySelect + "\n" + 
            "myCheck1: " + values.myCheck1 + "\n" +
            "myCheck2: " + values.myCheck2 + "\n" +
            "myCheck3: " + values.myCheck3 + "\n" +
            "myRadio: " + values.myRadio + "\n" +
            "日付: " + ymd + "\n"
            // "時刻: " + format(values.myTime, 'HH:mm:ss') + "\n" +
            // "日付時刻: " + format(values.myDateTime, 'yyyy-MM-dd HH:mm:ss')
        )
    }, 500)
}

const Sample = () => {
    return (
        <div>
            {/* DateTimePickerを使う場合、MuiPickersUtilsProviderタグで囲む */}
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Formik
                    initialValues={initValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ errors, touched, submitForm, isSubmitting, values }) => (
                        <Form>
                            <div>{isSubmitting && <LinearProgress />}</div>
                            <div style={myStyle}>
                                <Field component={TextField} name="myText" label="myText" helperText="必須入力＆4～10文字以内" />
                            </div>
                            <div style={myStyle}>
                                <Field component={TextField} type="password" name="myPass" label="myPass" helperText="必須入力＆4～10文字以内" />
                            </div>
                            <div style={myStyle}>
                                <FormControl error={errors.mySelect ? true : false}>
                                    <InputLabel htmlFor="age-simple">MySelect</InputLabel>
                                    <Field
                                        component={Select}
                                        name="mySelect"
                                    >
                                        {list.map(item => (
                                            <MenuItem value={item.id}>{item.name}</MenuItem>
                                        ))}
                                    </Field>
                                    <FormHelperText>{errors.mySelect ? errors.mySelect : "必須選択"}</FormHelperText>
                                </FormControl>
                            </div>
                            <div style={myStyle}>
                                <FormControl error={errors.myCheck ? true : false}>
                                    <FormLabel component="legend">myCheck</FormLabel>
                                    <FormGroup>
                                        {list2.map(item => (
                                            <FormControlLabel
                                                control={
                                                    <Field
                                                        component={Checkbox}
                                                        name={item.name}
                                                        checked={values[item.name]}
                                                    />
                                                }
                                                label={item.label}
                                            />
                                        ))}
                                    </FormGroup>
                                    <FormHelperText>{errors.myCheck ? errors.myCheck : "必須選択"}</FormHelperText>
                                </FormControl>
                            </div>
                            <div style={myStyle}>
                                <FormControl error={errors.myRadio ? true : false}>
                                    <FormLabel component="legend">myRadio</FormLabel>
                                    <Field component={RadioGroup} name="myRadio">
                                        {list3.map(item => (
                                            <FormControlLabel
                                                value={item.value}
                                                control={<Radio />}
                                                label={item.label}
                                            />
                                        ))}
                                    </Field>
                                    <FormHelperText>{errors.myRadio ? errors.myRadio : "必須選択＆ＥorＦさんを選択"}</FormHelperText>
                                </FormControl>
                            </div>
                             <div style={myStyle}>
                                <Field
                                    component={KeyboardDatePicker}
                                    clearable
                                    margin="normal"
                                    name="myDate"
                                    label="myDate"
                                    format="yyyy-MM-dd"
                                    locale={ja}
                                    // helperText={errors.myDate ? errors.myDate : "必須入力＆本日より前後3日以内の日付のみ入力可"}
                                />
                                {/* {errors.myDate && touched.myDate ? (
                                    <div style={myErrStyle}>{errors.myDate}</div>
                                ) : null} */}
                            </div>
                            {/*
                            <div style={myStyle}>
                                <Field
                                    component={KeyboardTimePicker}
                                    name="myTime"
                                    label="時刻"
                                    format="HH:mm:ss"
                                    locale={ja}
                                />
                            </div>
                            <div style={myStyle}>
                                <Field
                                    component={KeyboardDateTimePicker}
                                    name="myDateTime"
                                    label="日付時刻"
                                    format="yyyy-MM-dd HH:mm:ss"
                                    locale={ja}
                                />
                            </div> */}
                            <div style={myStyle}>
                                <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>入力された値の表示</Button>
                            </div>
                            <div style={myStyle}>
                                <pre>
                                    {JSON.stringify(errors, null, 2)}
                                </pre>
                            </div>
                        </Form>
                    )}
                </Formik>
            </MuiPickersUtilsProvider>
        </div>
    )
}

export default Sample