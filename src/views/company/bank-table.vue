<template>
  <div>
    <p>
      <el-button type="primary" size="small" icon="el-icon-plus" @click="showDialog(-1)">新增</el-button>
    </p>
    <el-table :data="bank" :border="true" :stripe="false" :show-header="true">
      <el-table-column label="开户银行" prop="bank" />
      <el-table-column label="卡号" prop="bank_num" />
      <el-table-column label="开户地址" prop="bank_addr" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="showDialog(scope.$index)">编辑</el-button>
          <el-button type="text" @click="remove(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      width="60%"
      :title="editIndex === -1 ? '新增银行卡' : '编辑银行卡'"
      :visible.sync="visible"
      :before-close="closeDialog"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="100px" label-suffix="：">
        <el-form-item label="开户银行" prop="bank">
          <el-input v-model="form.bank" />
        </el-form-item>
        <el-form-item label="银行账号" prop="bank_num">
          <el-input v-model="form.bank_num" />
        </el-form-item>
        <el-form-item label="开户地址" prop="bank_addr">
          <el-input v-model="form.bank_addr" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="onDialogOk">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  name: "BankTable",
  props: {
    list: {
      type: Array,
      value: [],
    },
  },
  data() {
    return {
      bank: [],
      visible: false,
      editIndex: -1,
      form: {
        bank: "",
        bank_num: "",
        bank_addr: "",
      },
      rules: {
        bank: [{ required: true, message: "必填项" }],
        bank_num: [{ required: true, message: "必填项" }],
        bank_addr: [{ required: true, message: "必填项" }],
      },
    };
  },
  watch: {
    list(newVal, oldVal) {
      this.bank = _.cloneDeep(newVal);
    },
  },
  methods: {
    showDialog(editIndex) {
      this.visible = true;
      this.editIndex = editIndex;
      if (editIndex >= 0) {
        this.form = _.cloneDeep(this.bank[this.editIndex]);
      }
    },
    closeDialog() {
      this.visible = false;
      this.$refs.form.resetFields();
    },
    onDialogOk() {
      this.$refs.form.validate((valid) => {
        if (!valid) return;
        const newBank = _.cloneDeep(this.form);
        if (this.editIndex === -1) {
          this.bank.push(newBank);
        } else {
          this.$set(this.bank, this.editIndex, newBank);
        }
        this.$emit("change", this.bank);
        this.closeDialog();
      });
    },
    remove(removedIndex) {
      this.bank = this.bank.filter((item, index) => index !== removedIndex);
    },
  },
};
</script>
