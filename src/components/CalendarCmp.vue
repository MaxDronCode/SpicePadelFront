<template>
  <NavCmp/>
  <div class="calendar">
    <div class="title">
      <h2>calendario</h2>
      <div class="checks">
        <span @click="onCheckDate('reduction','year')" class="check-item">&lt;&lt;</span>
        <span @click="onCheckDate('reduction','month')" class="check-item">&nbsp;&lt;&nbsp;</span>
        <span class="check-item-date">{{getYearMonth}}</span>
        <span @click="onCheckDate('add','month')" class="check-item">&nbsp;&gt;&nbsp;</span>
        <span @click="onCheckDate('add','year')" class="check-item">&gt;&gt;</span>
      </div>
    </div>
    <div class="calendar-days">
      <div class="calendar-header">
        <span v-for="(item,index) in calendarHeader" :key="index" class="header-item">{{item}}</span>
      </div>
      <div class="day-row" v-for="row in 6" :key="row">
        <span @click="onSelectDay(row,line)" 
          class="day-line" 
          :class="{
            'select-day': row == selectDay.row && line == selectDay.line,
            'not-current-month': notCurrentMonth(visibleDays[(row-1)*7+line-1]),
            'current-day': currentDay(visibleDays[(row-1)*7+line-1])
          }" 
          v-for="line in 7" 
          :key="line">
          {{ getDay(visibleDays[(row-1)*7+line-1]) }}
      </span>

      </div>
    </div>
  </div>
</template>

<script>
import NavCmp from './NavCmp.vue';
export default {
  name: 'CalendarCmp',
  components: {
    NavCmp
  },
  data() {
    return {
      calendarHeader: ["día", "una", "dos", "Tres", "Cuatro", "cinco", "seis"],
      nowDate: new Date(),
      selectDay: {
        row: null,
        line: null
      }
    }
  },
  computed: {
    // la fecha actual se cambia al año
    getYearMonth() {
      const date = new Date(this.nowDate);
      const year = date.getFullYear();
      let month = date.getMonth();
      month = month + 1;
      month = month < 10 ? month = "0" + month : month;
      return `${year}año${month}Mes;`
    },
    visibleDays() {
      const { year, month } = this.getYearMonthDay(new Date(this.nowDate)); // obtener el año en curso
      let currentFirstDay = new Date(year, month, 1); // el primer día del mes actual
      const week = currentFirstDay.getDay(); // cual dia
      let startDay = currentFirstDay - week * 24 * 60 * 60 * 1000; // Tiempo de empezar
      // Circulación 42 días (Formato de calendario de garantía unificado 6 * 7)
      let dayArr = new Array();
      for (let i = 0; i < 42; i++) {
        dayArr.push(new Date(startDay + i * 24 * 60 * 60 * 1000));
      }
      return dayArr;
    }
  },
  methods: {
    // cambiar el evento anual
    onCheckDate(mode, category) {
      const { year, month } = this.getYearMonthDay(new Date(this.nowDate));
      if (mode == "add") {
        if (category == "year") {
          this.nowDate = new Date(year + 1, month, 1);
        } else {
          this.nowDate = new Date(year, month + 1, 1);
        }
      } else {
        if (category == "year") {
          this.nowDate = new Date(year - 1, month, 1);
        } else {
          this.nowDate = new Date(year, month - 1, 1);
        }
      }
    },
    // haz clic en un evento de fecha
    onSelectDay(row, line) {
      this.selectDay.row = row;
      this.selectDay.line = line;
    },
    // determinar cuál es la fecha actual
    currentDay(date) {
      const currentDate = this.getYearMonthDay(new Date(date));
      const nowDate = this.getYearMonthDay(new Date());
      if (currentDate.year == nowDate.year && currentDate.month == nowDate.month && currentDate.day == nowDate.day) {
        return true;
      } else {
        return false;
      }
    },
    // Determinar si la fecha actual no es este mes
    notCurrentMonth(date) {
      if (this.getYearMonthDay(new Date(date)).month != this.getYearMonthDay(new Date(this.nowDate)).month) {
        return true;
      } else {
        return false;
      }
    },
    // obtener la fecha
    getYearMonthDay(date) {
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      return { year, month, day };
    }
  },
  filters: {
    // convertir una fecha de mayo
    getDay(date) {
      return new Date(date).getDate();
    }
  },
  mounted() {
  }
}
</script>

<style lang="less" scoped>
.calendar {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
     // cabeza
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    .check-item-date {
      margin: 0 10px;
    }
    .check-item {
      margin: 0 10px;
      cursor: pointer;
      user-select: none;
      display: inline-block;
      &:hover {
        color: #000000;
        transform: scale(1.1);
      }
    }
  }
  // calendario
  .calendar-days {
    flex: 1;
    display: flex;
    flex-direction: column;
    .calendar-header {
      display: flex;
      margin: 10px 0;
      user-select: none;
      .header-item {
        display: block;
        flex: 1;
        text-align: center;
        font-weight: bold;
      }
    }
    .day-row {
      flex: 1;
      display: flex;
      .day-line {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
        cursor: pointer;
        transition: all 0.2s;
        user-select: none;
        &:hover {
          background-color: #c3d3eb;
        }
      }
      // no mes
      .not-current-month {
        color: #aaa;
      }
      // fecha actual
      .current-day {
        background-color: #2475ec;
        color: #fff;
      }
      // Fecha seleccionada
      .select-day {
        background-color: #c3d3eb;
      }
    }
  }
}
</style>
