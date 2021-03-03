<template>
  <div id="pageDashboard">
    <v-container grid-list-xl fluid>
      <button @click="onChangeType">
        Switch to {{ type === "Indonesia" ? "Global" : "Indonesia" }}
      </button>
      <v-layout row wrap>
        <h2>Jumlah Kasus di {{ type }} Saat Ini</h2>
        <div class="statistic">
          <div class="card">
            <div class="count">
              {{ thousandFormatSeparator(totalCases[0].confirmed) }}
            </div>
            <div class="desc">Terkonfirmasi</div>
          </div>
          <div class="card">
            <div class="count">
              {{ thousandFormatSeparator(totalCases[0].critical) }}
            </div>
            <div class="desc">Kritis</div>
          </div>
          <div class="card">
            <div class="count">
              {{ thousandFormatSeparator(totalCases[0].recovered) }}
            </div>
            <div class="desc">Sembuh</div>
          </div>
          <div class="card">
            <div class="count">
              {{ thousandFormatSeparator(totalCases[0].deaths) }}
            </div>
            <div class="desc">Meninggal</div>
          </div>
        </div>
      </v-layout>
      <download-excel
        class="btn"
        :data="totalCases"
        :fields="json_fields"
        worksheet="Covid19 Data"
        name="covid19_data.xls"
      >
        Download to Excel
      </download-excel>
    </v-container>
<v-container grid-list-xl fluid>
    <v-flex sm12>
      <h3>Data Indonesia</h3>
    </v-flex>
    <v-flex lg12>
      <v-data-table
        :headers="basic.headers"
        :items="basic.items"
        hide-actions
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.Provinsi }}</td>
          <td>{{ props.item.Kasus_Posi }}</td>
          <td>{{ props.item.Kasus_Semb }}</td>
          <td>{{ props.item.Kasus_Meni }}</td>
        </template>
      </v-data-table>
    </v-flex>
    <download-excel
        class="btn"
        :data="basic.items"
        :fields="basic.download.fields"
        worksheet="Covid19 Data"
        name="covid19_data_lengkap.xls"
      >
        Download to Excel
      </download-excel>
</v-container>
  </div>
</template>

<script>
import {
  GET_COUNTRY_CASES,
  GET_GLOBAL_CASES,
} from "../services/kawalcorona.service";
import { thousandFormat } from "../util";
import JsonExcel from "vue-json-excel";
import province from "@/api/province";

export default {
  layout: "dashboard",
  components: {
    downloadExcel: JsonExcel,
  },
  async asyncData() {
    const getCountryCases = await GET_COUNTRY_CASES("indonesia");
    return {
      totalCases: getCountryCases.data,
    };
  },
  data: () => {
    return {
      type: "Indonesia",
      totalCases: [],
      json_fields: {
        Country: "country",
        Confirmed: "confirmed",
        Recovered: "recovered",
        Critical: "critical",
        Deaths: "deaths",
      },
      json_meta: [
        [
          {
            key: "charset",
            value: "utf-8",
          },
        ],
      ],
      basic: {
        headers: [
          {
            text: "Region",
            align: "left",
            sortable: false,
            value: "Provinsi",
          },
          { text: "Positif", value: "Kasus_Posi" },
          { text: "Sembuh", value: "Kasus_Semb" },
          { text: "Meninggal", value: "Kasus_Meni" },
        ],
        items: province,
        download: {
          fields: {
            Region: 'Provinsi',
            Positif: 'Kasus_Posi',
            Sembuh: 'Kasus_Semb',
            Meninggal: 'Kasus_Meni'
          },
          json_meta: [
            [
              {
                key: "charset",
                value: "utf-8",
              },
            ],
          ],
        }
      },
    };
  },
  computed: {},
  methods: {
    thousandFormatSeparator(values) {
      return thousandFormat(values);
    },
    async onChangeType() {
      this.type = this.type === "Indonesia" ? "Global" : "Indonesia";
      if (this.type === "Indonesia") {
        const getCountryCases = await GET_COUNTRY_CASES("indonesia");
        this.totalCases = getCountryCases.data;
      } else {
        const getGlobalCases = await GET_GLOBAL_CASES();
        const temp = [];
        temp[0] = {
          ...getGlobalCases.data[0],
          country: "Global",
        };
        this.totalCases = temp;
      }
    },
  },
};
</script>

<style lang="stylus">
.statistic {
  display: flex;
  width: 100%;
}

.card {
  background: #fff;
  padding: 16px;
  border-radius: 5px;
  box-shadow: #000;
  border-radius: 5px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.02);
  text-align: center;
  width: -webkit-fill-available;
  margin: 10px;

  .count {
    font-size: 24px;
  }
}

.btn {
  padding: 8px 16px;
  background: #3f51b5;
  border-radius: 5px;
  width: fit-content;
  color: #FFF;
  margin-top: 8px;
  cursor: pointer;
}
</style>
