<template>
  <div id="pageDashboard">
    <v-container grid-list-xl fluid>
      <!-- <v-layout row wrap>
        <h2>Jumlah Kasus di Dunia Saat Ini</h2>
        <div class="statistic">
          <div class="card">
            <div class="count">{{totalGlobal.confirmed}}</div>
            <div class="desc">Terkonfirmasi</div>
          </div>
           <div class="card">
            <div class="count">{{totalGlobal.critical}}</div>
            <div class="desc">Perawatan</div>
          </div>
           <div class="card">
            <div class="count">{{totalGlobal.recovered}}</div>
            <div class="desc">Sembuh</div>
          </div>
           <div class="card">
            <div class="count">{{totalGlobal.deaths}}</div>
            <div class="desc">Meninggal</div>
          </div>
        </div>
      </v-layout> -->
      <button @click="onChangeType">Switch to {{type === 'Indonesia' ? 'Global' : 'Indonesia'}}</button>
      <v-layout row wrap>
        <h2>Jumlah Kasus di {{type}} Saat Ini</h2>
        <div class="statistic">
          <div class="card">
            <div class="count">{{thousandFormatSeparator(totalCases.confirmed)}}</div>
            <div class="desc">Terkonfirmasi</div>
          </div>
           <div class="card">
            <div class="count">{{thousandFormatSeparator(totalCases.critical)}}</div>
            <div class="desc">Kritis</div>
          </div>
           <div class="card">
            <div class="count">{{thousandFormatSeparator(totalCases.recovered)}}</div>
            <div class="desc">Sembuh</div>
          </div>
           <div class="card">
            <div class="count">{{thousandFormatSeparator(totalCases.deaths)}}</div>
            <div class="desc">Meninggal</div>
          </div>
        </div>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import { GET_COUNTRY_CASES, GET_GLOBAL_CASES } from '../services/kawalcorona.service'
  import { thousandFormat } from '../util'

  export default {
    layout: 'dashboard',
    components: {},
     async asyncData() {
      const getCountryCases = await GET_COUNTRY_CASES('indonesia')
      return {
        totalCases: getCountryCases.data[0]
      }
    },
    data: () => ({
      type: 'Indonesia',
      totalCases: {}
    }),
    computed: {
      
    },
    methods: {
      thousandFormatSeparator(values) {
        return thousandFormat(values)
      },
      async onChangeType() {
        this.type = this.type === 'Indonesia' ? 'Global' : 'Indonesia'
        if(this.type === 'Indonesia') {
          const getCountryCases = await GET_COUNTRY_CASES('indonesia')
          this.totalCases = getCountryCases.data[0]
        } else {
          const getGlobalCases = await GET_GLOBAL_CASES()
          this.totalCases = getGlobalCases.data[0]
        }
      }
    }
  };
</script>

<style lang="stylus">
.statistic{
  display : flex;
  width : 100%;
}
  .card {
    background: #fff;
    padding: 16px;
    border-radius: 5px;
    box-shadow: #000;
    border-radius: 5px;
    box-shadow: 5px 5px 10px rgba(0,0,0,0.02);
    text-align: center;
    width: -webkit-fill-available;
    margin: 10px;
    .count{
      font-size: 24px;
    }
  }
</style>
