<template>
  <div>
    <el-form ref="form" :model="formData" :inline="true">
      <el-form-item prop="id">
        <el-input type="text" placeholder="请输入ID" :clearable="true" v-model="formData.id" />
      </el-form-item>
      <el-form-item prop="full_name">
        <el-input type="text" placeholder="请输入公司名称" :clearable="true" v-model="formData.full_name" />
      </el-form-item>
      <el-form-item prop="com_code">
        <el-input type="text" placeholder="请输入社会信用代码" :clearable="true" v-model="formData.com_code" />
      </el-form-item>
      <el-form-item>
        <el-button @click="reset">重置</el-button>
        <el-button type="primary" @click="search" icon="el-icon-search">查询</el-button>
      </el-form-item>
    </el-form>
    <p>
      <router-link to="/company/edit/0">
        <el-button type="primary" size="small" icon="el-icon-plus">新增</el-button>
      </router-link>
    </p>
    <el-table :loading="loading" :data="list" :border="true" :stripe="true" :show-header="true">
      <el-table-column label="ID" width="80" prop="id" sortable />
      <el-table-column label="名称" width="200" prop="full_name" />
      <el-table-column label="简称" width="120" prop="short_name" />
      <el-table-column label="统一社会信用代码" width="200" prop="com_code" />
      <el-table-column label="区域" width="150" prop="area" />
      <el-table-column label="详细地址" width="200" prop="addr" />
      <el-table-column label="操作时间" width="200" prop="created_at" />
      <el-table-column label="操作" width="100" fixed="right">
        <template slot-scope="scope">
          <router-link :to="`/company/detail/${scope.row.id}`">
            <el-button type="text">查看</el-button>
          </router-link>
          <el-divider direction="vertical" />
          <router-link :to="`/company/edit/${scope.row.id}`">
            <el-button type="text">编辑</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align: right;">
      <br />
      <el-pagination
        :page-size="10"
        :total="total"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 50, 100]"
        @size-change="onSizeChange"
        @current-change="onCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "CompanyList",
  data() {
    return {
      formData: {
        page: 1,
        size: 10,
        full_name: "",
        com_code: "",
      },
      loading: false,
      list: [],
      total: 0,
      currentPage: 1,
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
      this.formData.page = 1;
      this.formData.size = 10;
      this.$refs.form.resetFields();
      this.fetchTableData();
    },

    /**
     * 获取表格数据
     * @returns {Promise<*[]>}
     */
    async fetchTableData() {
      this.loading = true;
      const res = await request({
        method: "GET",
        url: "/api/com/list",
        params: this.formData,
      });
      this.loading = false;
      this.list = res.data;
      this.total = this.list.length;
    },

    /**
     * pageSize 改变时会触发
     * @param {number} size 新的页长
     */
    onSizeChange(size) {
      this.currentPage = 1;
      this.size = size;
      this.fetchTableData();
    },

    /**
     * currentPage 改变时会触发
     * @param {number} currentPage 新的页码
     */
    onCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.fetchTableData();
    },
  },
};
</script>
