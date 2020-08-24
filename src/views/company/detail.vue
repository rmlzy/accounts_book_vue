<template>
  <div>
    <h3 class="fb-title">基本信息</h3>
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="description">
          <div class="description__label">ID：</div>
          <div class="description__value">{{ detail.id }}</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="description">
          <div class="description__label">公司名称：</div>
          <div class="description__value">{{ detail.full_name }}</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="description">
          <div class="description__label">公司简称：</div>
          <div class="description__value">{{ detail.short_name }}</div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="description">
          <div class="description__label">统一社会信用代码：</div>
          <div class="description__value">{{ detail.com_code }}</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="description">
          <div class="description__label">行业：</div>
          <div class="description__value">{{ detail.industry }}</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="description">
          <div class="description__label">地区：</div>
          <div class="description__value">{{ detail.area }}}</div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="description">
          <div class="description__label">通讯地址：</div>
          <div class="description__value">{{ detail.addr }}</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="description">
          <div class="description__label">公司网址：</div>
          <div class="description__value">{{ detail.net_addr }}</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="description">
          <div class="description__label">备注：</div>
          <div class="description__value">{{ detail.note }}</div>
        </div>
      </el-col>
    </el-row>
    <br />

    <h3 class="fb-title">银行信息</h3>
    <el-table :data="detail.bank" :border="false" :stripe="false" :show-header="true">
      <el-table-column label="开户银行" prop="bank" />
      <el-table-column label="卡号" prop="bank_num" />
      <el-table-column label="开户地址" prop="bank_addr" />
    </el-table>
    <br />

    <h3 class="fb-title">联系人</h3>
    <el-table :data="detail.linkman" :border="false" :stripe="false" :show-header="true">
      <el-table-column label="姓名" prop="name" />
      <el-table-column label="手机号" prop="phone" />
      <el-table-column label="职位" prop="position" />
      <el-table-column label="邮箱" prop="email" />
      <el-table-column label="备注" prop="note" />
    </el-table>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "CompanyDetail",
  data() {
    return {
      id: "",
      detail: {
        bank: [],
        linkman: [],
      },
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    this.fetchDetail();
  },
  methods: {
    async fetchDetail() {
      const res = await request({
        method: "GET",
        url: `/api/com/get?id=${this.id}`,
      });
      this.detail = res.data;
    },
  },
};
</script>

<style lang="scss">
.description {
  font-size: 14px;

  &__label {
    display: table-cell;
    padding-bottom: 16px;
    color: rgba(0, 0, 0, 0.85);
    line-height: 20px;
    white-space: nowrap;
  }

  &__value {
    display: table-cell;
    width: 100%;
    padding-bottom: 16px;
    color: rgba(0, 0, 0, 0.65);
    line-height: 20px;
  }
}
</style>
