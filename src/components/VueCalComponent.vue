<template lang="pug">
.main-demo
    .mb10.tagline
        .title2.grey-dark1 Go for the date picker...
        .title1.text-right.primary-dark1 or unleash the full potential!
    .w-flex.wrap.align-center.justify-center
        .ma4
            //- Date picker.
            //- Full-power calendar.
            vue-cal.demo.full-cal.vuecal--full-height-delete(
                :selected-date="selectedDate"
                :time-from="8 * 60"
                :time-to="19 * 60"
                :split-days="splits"
                sticky-split-labels
                :events="events"
                @cell-focus="selectedDate = $event.date || $event"
                style="height: 450px")
                template(#split-label="{ split, view }")
                    w-icon(:color="split.color" size="20") material-icons person
                    strong(:style="`color: ${split.color}`") {{ split.label }}
            a.mt4.w-flex.justify-end.grey-light1(
                href="https://github.com/antoniandre/vue-cal/blob/master/src/documentation/main-demo.vue"
                target="_blank")
                | View this example source code
                w-icon.ml1(color="grey lighten-1") material-icons open_in_new
</template>

<script>
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
// import axios from 'axios'

export default {
    components: { VueCal },
    data: () => ({
        events: [],
        selectedDate: new Date(),
    }),
    props: {
        selectedFieldId: String
    },
    created() {
        console.log("Entra en created")
        // this.handleFieldSelection();
    },

    methods: {
        
    //     async fetchBookings() {

    //         if (!this.selectedFieldId) {
    //             console.log("No field ID selected yet.");
    //             return; // Detener la ejecución si no hay un field_id seleccionado
    //         }

    //         try {
    //             const response = await axios.get(`http://localhost/spicepadel_api/api/getBookings.php?field_id=${this.selectedFieldId}`);
    //             this.events = response.data.map(booking => ({
    //                 start: `${booking.date} ${booking.start_hour}`,
    //                 end: `${booking.date} ${booking.end_hour}`,
    //                 title: `Field ${booking.field_id}`,
    //                 content: `<i class="w-icon material-icons mt1">sports_soccer</i> Member ${booking.member_id}`,
    //                 resizable: false,
    //                 deletable: false,
    //                 split: booking.field_id % 2 === 0 ? 1 : 2
    //             }));
    //         } catch (error) {
    //             console.error('Error fetching bookings:', error);
    //         }
    //     },
    //     handleFieldSelection() {
    //         console.log("Estamos en handleFieldSelection")
    //     if (this.selectedFieldId) {
    //         console.log("El selected field id esta establecido")
    //         this.fetchBookings();
    //     }
    // }

    // },
    // watch: {
    // selectedFieldId(newVal, oldVal) {
    //   if (newVal && newVal !== oldVal) {
    //     this.fetchBookings();
    //   }
    // }
  },
    
}


</script>

<style lang="scss">
// @import 'vue-cal/dist/vuecal.css';

// .main-demo {
//     font-size: 12px;
   

//     .tagline {
//         max-width: 500px;
//         margin: 0 auto 5rem;

//         .title1 {
//             letter-spacing: normal;
//         }
//     }

//     .demo {
//         border-radius: 4px;

//         &.vuecal--date-picker .vuecal__cell-events-count {
//             width: 4px;
//             height: 4px;
//             min-width: 0;
//             padding: 0;
//             margin-top: 4px;
//             color: transparent;
//             background-color: #42b983;
//         }

//         &.vuecal--date-picker .vuecal__cell--selected .vuecal__cell-events-count {
//             background-color: #f1f1f1;
//         }

//         .vuecal__cell--out-of-scope {
//             color: rgba(0, 0, 0, 0.15);
//         }

//         &.full-cal .vuecal__menu {
//             background-color: transparent;
//         }

//         &.full-cal .vuecal__title-bar {
//             background: rgba(0, 0, 0, 0.03);
//         }

//         .vuecal__view-btn {
//             background: none;
//             padding: 0 10px;
//             margin: 4px 2px;
//             border-radius: 30px;
//             height: 20px;
//             line-height: 20px;
//             font-size: 13px;
//             text-transform: uppercase;
//             border: none;
//             color: inherit;

//             &--active {
//                 background: rgb(66, 185, 130);
//                 color: #fff;
//             }
//         }

//         &.full-cal .weekday-label {
//             opacity: 0.4;
//             font-weight: 500;
//         }

//         .vuecal__header .w-icon {
//             color: inherit;
//         }

//         &:not(.vuecal--day-view) .vuecal__cell--selected {
//             background-color: transparent;
//         }

//         &:not(.vuecal--day-view).full-cal .vuecal__cell--selected:before {
//             border: 1px solid rgba(#42b983, 0.8);

//         }

//         .vuecal__event-time {
//             margin: 3px 0;
//             font-size: 12px;
//             font-weight: 500;
//             line-height: 1.2;
//         }

//         .vuecal__header .john {
//             color: darken(#42b983, 5);
//         }

//         .vuecal__body .john {
//             background-color: rgba(#42b983, 0.08);
//         }

//         .john .vuecal__event {
//             background-color: rgba(lighten(#42b983, 5), 0.85);
//             color: #fff;
//         }

//         .john .lunch {
//             background: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(#42b983, 0.15) 10px, rgba(#42b983, 0.15) 20px);
//             color: transparentize(darken(#42b983, 10), 0.4);
//         }

//         .vuecal__header .kate {
//             color: darken(#ff7fc8, 5);
//         }

//         .vuecal__body .kate {
//             background-color: rgba(#ff7fc8, 0.08);
//         }

//         .kate .vuecal__event {
//             background-color: rgba(lighten(#ff7fc8, 5), 0.85);
//             color: #fff;
//         }

//         .kate .lunch {
//             background: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(#ff7fc8, 0.15) 10px, rgba(#ff7fc8, 0.15) 20px);
//             color: transparentize(darken(#ff7fc8, 10), 0.4);
//         }
//     }
// }
</style>