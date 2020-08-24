<template>
  <div>
    <h3 class="fb-title">基本信息</h3>
    <el-form ref="formData" :model="formData" :rules="basicRules" size="medium" label-suffix="：">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="公司名称" prop="full_name">
            <el-input type="text" placeholder="请输入" v-model="formData.full_name" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="统一社会信用代码" prop="com_code">
            <el-input type="text" placeholder="请输入" v-model="formData.com_code" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="行业" prop="industry">
            <el-input type="text" placeholder="请输入" v-model="formData.industry" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="地区" prop="area">
            <el-input type="text" placeholder="上海-浦东新区" v-model="formData.area" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="通讯地址" prop="addr">
            <el-input type="text" placeholder="请输入" v-model="formData.addr" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="公司网址" prop="net_addr">
            <el-input type="text" placeholder="请输入" v-model="formData.net_addr" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-form-item label="备注" prop="note">
            <el-input type="textarea" placeholder="请输入" v-model="formData.note" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <h3 class="fb-title">银行信息</h3>
    <bank-table :list="formData.bank" @change="setBank" />
    <br />

    <h3 class="fb-title">联系人</h3>
    <linkman-table :list="formData.linkman" @change="setLinkman" />
    <br />

    <p>
      <el-button type="primary" @click="save">保存</el-button>
    </p>
  </div>
</template>

<script>
import _ from "lodash";
import request from "@/utils/request";
import BankTable from "./bank-table";
import LinkmanTable from "./linkman-table";

export default {
  name: "CompanyEdit",
  components: {
    BankTable,
    LinkmanTable,
  },
  data() {
    return {
      id: "",
      formData: {
        full_name: "",
        com_code: "",
        industry: "",
        area: "",
        addr: "",
        net_addr: "",
        note: "",
        bank: [],
        linkman: [],
      },
      basicRules: {
        full_name: [{ required: true, message: "必填项" }],
        com_code: [{ required: true, message: "必填项" }],
      },
    };
  },
  mounted() {
    const id = this.$route.params.id;
    if (id !== "0") {
      this.formData.id = id;
      this.queryInfo();
    }
  },
  methods: {
    async queryInfo() {
      const res = await request({
        method: "GET",
        url: `/api/com/get?id=${this.formData.id}`,
      });
      if (res.code !== 200) {
        this.$message.error(res.message);
        return;
      }
      this.formData = res.data;
    },
    setBank(bank) {
      this.formData.bank = bank;
    },
    setLinkman(linkman) {
      this.formData.linkman = linkman;
    },
    save() {
      this.$refs.formData.validate(async (valid) => {
        if (!valid) return;
        const formData = _.cloneDeep(this.formData);
        const loading = this.$loading({
          lock: true,
          background: "rgba(255,255,255,0.5)",
        });
        const res = await request({
          method: "POST",
          url: formData.id ? "/api/com/update" : "/api/com/add",
          data: { ...formData, bank: this.bank, linkman: this.linkman },
        });
        loading.close();
        if (res.code !== 200) {
          this.$message.error(res.message);
          return;
        }
        this.$message.success(res.message);
        this.$router.push("/company");
      });
    },
  },
};
</script>
