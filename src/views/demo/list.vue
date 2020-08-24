<template>
  <div>
    <el-form
      ref="form"
      :model="formData"
      :inline="true"
      size="medium"
      label-position="right"
      label-width="100px"
      label-suffix="："
    >
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="姓名" prop="name">
            <el-input
              style="width: 220px;"
              type="text"
              placeholder="请输入"
              :clearable="true"
              v-model="formData.name"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号" prop="mobile">
            <el-input
              style="width: 220px;"
              type="text"
              :minlength="11"
              placeholder="请输入"
              :clearable="true"
              v-model="formData.mobile"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="订单号" prop="orderNo">
            <el-input
              style="width: 220px;"
              type="text"
              placeholder="请输入"
              :clearable="true"
              v-model="formData.orderNo"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="下单时间" prop="orderDate">
            <el-date-picker
              type="date"
              :clearable="true"
              placeholder="请选择"
              align="left"
              v-model="formData.orderDate"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否激活" prop="active">
            <el-switch
              active-text="是"
              inactive-text="否"
              active-color="#409EFF"
              inactive-color="#C0CCDA"
              v-model="formData.active"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-button size="small" native-type="button">重置</el-button>
          <el-button type="primary" size="small" icon="el-icon-search" native-type="button">搜索</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-button type="primary" size="small" icon="el-icon-plus" native-type="button">新增</el-button>

    <el-table
      style="margin: 15px 0;"
      :loading="loading"
      :border="true"
      :stripe="true"
      :show-header="true"
      :data="[
        { id: '模拟数据0', name: '模拟数据0', mobile: '模拟数据0', status: '模拟数据0', action: '模拟数据0' },
        { id: '模拟数据1', name: '模拟数据1', mobile: '模拟数据1', status: '模拟数据1', action: '模拟数据1' },
        { id: '模拟数据2', name: '模拟数据2', mobile: '模拟数据2', status: '模拟数据2', action: '模拟数据2' },
        { id: '模拟数据3', name: '模拟数据3', mobile: '模拟数据3', status: '模拟数据3', action: '模拟数据3' },
        { id: '模拟数据4', name: '模拟数据4', mobile: '模拟数据4', status: '模拟数据4', action: '模拟数据4' },
        { id: '模拟数据5', name: '模拟数据5', mobile: '模拟数据5', status: '模拟数据5', action: '模拟数据5' },
        { id: '模拟数据6', name: '模拟数据6', mobile: '模拟数据6', status: '模拟数据6', action: '模拟数据6' },
        { id: '模拟数据7', name: '模拟数据7', mobile: '模拟数据7', status: '模拟数据7', action: '模拟数据7' },
        { id: '模拟数据8', name: '模拟数据8', mobile: '模拟数据8', status: '模拟数据8', action: '模拟数据8' },
        { id: '模拟数据9', name: '模拟数据9', mobile: '模拟数据9', status: '模拟数据9', action: '模拟数据9' },
      ]"
    >
      <el-table-column label="ID" :sortable="true" prop="id" />
      <el-table-column label="用户名" prop="name" />
      <el-table-column label="手机号" prop="mobile" />
      <el-table-column label="状态" prop="status" />
      <el-table-column label="操作" prop="action" />
    </el-table>

    <div style="text-align: right; margin: 15px 0;">
      <el-pagination
        :page-size="10"
        :background="true"
        :total="total"
        :current-page="page"
        :page-sizes="[10, 20, 30, 50, 100]"
        @size-change="onSizeChange"
        @current-change="onPageChange"
      />
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "ListPage",
  data() {
    return {
      formData: { name: "", mobile: "", orderNo: "", orderDate: "", active: "" },
      list: [],
      loading: false,
      total: 0,
      page: 1,
      size: 10,
    };
  },
  mounted() {
    this.fetchTableData();
  },
  methods: {
    /**
     * 查询
     */
    search() {
      this.formData.page = 1;
      this.fetchTableData();
    },

    /**
     * 重置
     */
    reset() {
      this.page = 1;
      this.size = 10;
      this.$refs.form.resetFields();
      this.fetchTableData();
    },

    /**
     * 获取表格数据
     * @returns {Promise<*[]>}
     */
    async fetchTableData() {
      this.loading = true;
      try {
        const res = await request({
          method: "GET",
          url: "/api/mock/api",
          params: this.formData,
        });
        if (res.respCode !== "0000") {
          this.$message.error(res.respDesc);
          return;
        }
        const { list, total, page, size } = res.data;
        this.list = list;
        this.total = total;
        this.page = page;
        this.size = size;
      } catch (e) {
        this.$message.error(e.message);
      } finally {
        this.loading = false;
      }
    },

    /**
     * size 改变时会触发
     * @param {number} size 新的页长
     */
    onSizeChange(size) {
      this.page = 1;
      this.size = size;
      this.fetchTableData();
    },

    /**
     * page 改变时会触发
     * @param {number} page 新的页码
     */
    onPageChange(page) {
      this.page = page;
      this.fetchTableData();
    },
  },
};
</script>
