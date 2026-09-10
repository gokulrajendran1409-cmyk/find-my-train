import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const stations = [
  {
    name: "Trivandrum Central",
    code: "TVC",
    scheduled: "11:15 AM",
    actual: "11:18 AM",
    status: "completed",
  },
  {
    name: "Kollam Jn",
    code: "QLN",
    scheduled: "12:25 PM",
    actual: "12:32 PM",
    status: "completed",
  },
  {
    name: "Kayamkulam Jn",
    code: "KYJ",
    scheduled: "01:10 PM",
    actual: "01:18 PM",
    status: "current",
  },
  {
    name: "Alappuzha",
    code: "ALLP",
    scheduled: "01:55 PM",
    actual: "02:03 PM",
    status: "upcoming",
  },
  {
    name: "Ernakulam Jn",
    code: "ERS",
    scheduled: "03:05 PM",
    actual: "--",
    status: "upcoming",
  },
  {
    name: "Thrissur",
    code: "TCR",
    scheduled: "04:25 PM",
    actual: "--",
    status: "upcoming",
  },
  {
    name: "Shoranur Jn",
    code: "SRR",
    scheduled: "05:40 PM",
    actual: "--",
    status: "upcoming",
  },
];

export default function TrainStatusScreen({ navigation }) {
  const [showNotify, setShowNotify] = useState(false);
  const [selectedTime, setSelectedTime] = useState(30);
  const [notificationSet, setNotificationSet] = useState(false);

  const handleSetNotification = () => {
    setNotificationSet(true);
    setShowNotify(false);

    console.log("Notification set:", selectedTime);
  };

  return (
    <SafeAreaView style={styles.safeArea}>

      {/* HEADER */}
      <View style={styles.header}>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation?.goBack()}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color="#123E45"
          />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>
            Live Train Status
          </Text>

          <View style={styles.liveHeader}>
            <View style={styles.liveDot} />

            <Text style={styles.liveHeaderText}>
              LIVE
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.moreButton}>
          <Ionicons
            name="ellipsis-horizontal"
            size={23}
            color="#123E45"
          />
        </TouchableOpacity>

      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >

        {/* TRAIN HEADER CARD */}
        <View style={styles.trainCard}>

          <View style={styles.trainTop}>

            <View style={styles.trainIcon}>
              <Ionicons
                name="train"
                size={30}
                color="#087F6B"
              />
            </View>

            <View style={styles.trainInfo}>
              <Text style={styles.trainNumber}>
                12625
              </Text>

              <Text style={styles.trainName}>
                Kerala Express
              </Text>
            </View>

            <View style={styles.liveBadge}>
              <View style={styles.liveDotSmall} />

              <Text style={styles.liveBadgeText}>
                LIVE
              </Text>
            </View>

          </View>

          {/* ROUTE */}
          <View style={styles.routeHeader}>

            <View>
              <Text style={styles.routeTime}>
                11:15 AM
              </Text>

              <Text style={styles.routeCode}>
                TVC
              </Text>

              <Text style={styles.routeStation}>
                Trivandrum
              </Text>
            </View>

            <View style={styles.routeMiddle}>

              <Text style={styles.routeDuration}>
                50h 20m
              </Text>

              <View style={styles.routeLine}>
                <View style={styles.routeDot} />

                <View style={styles.routeLineInner} />

                <Ionicons
                  name="train"
                  size={18}
                  color="#087F6B"
                />

                <View style={styles.routeLineInner} />

                <View style={styles.routeDot} />
              </View>

              <Text style={styles.runningText}>
                Running
              </Text>

            </View>

            <View style={styles.routeRight}>
              <Text style={styles.routeTime}>
                11:35 PM
              </Text>

              <Text style={styles.routeCode}>
                NDLS
              </Text>

              <Text style={styles.routeStation}>
                New Delhi
              </Text>
            </View>

          </View>

        </View>

        {/* CURRENT STATUS */}
        <View style={styles.statusCard}>

          <View style={styles.statusTop}>

            <View>
              <Text style={styles.statusLabel}>
                CURRENT LOCATION
              </Text>

              <Text style={styles.currentLocation}>
                Kayamkulam Jn
              </Text>

              <Text style={styles.currentCode}>
                KYJ • Kerala
              </Text>
            </View>

            <View style={styles.liveCircle}>
              <Ionicons
                name="radio"
                size={25}
                color="#087F6B"
              />
            </View>

          </View>

          <View style={styles.statusDivider} />

          <View style={styles.statusStats}>

            <View style={styles.stat}>
              <Text style={styles.statLabel}>
                STATUS
              </Text>

              <Text style={styles.onTime}>
                Running
              </Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.stat}>
              <Text style={styles.statLabel}>
                DELAY
              </Text>

              <Text style={styles.delay}>
                +8 min
              </Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.stat}>
              <Text style={styles.statLabel}>
                NEXT STOP
              </Text>

              <Text style={styles.statValue}>
                Alappuzha
              </Text>
            </View>

          </View>

        </View>

        {/* ARRIVAL CARD */}
        <View style={styles.arrivalCard}>

          <View style={styles.arrivalIcon}>
            <Ionicons
              name="location"
              size={24}
              color="#087F6B"
            />
          </View>

          <View style={styles.arrivalInfo}>
            <Text style={styles.arrivalLabel}>
              NEXT STATION
            </Text>

            <Text style={styles.arrivalStation}>
              Alappuzha
            </Text>

            <Text style={styles.arrivalCode}>
              ALLP
            </Text>
          </View>

          <View style={styles.arrivalTime}>
            <Text style={styles.arrivalEtaLabel}>
              Expected
            </Text>

            <Text style={styles.arrivalEta}>
              2:03 PM
            </Text>

            <Text style={styles.arrivalIn}>
              In 18 min
            </Text>
          </View>

        </View>

        {/* NOTIFICATION */}
        <TouchableOpacity
          style={[
            styles.notifyCard,
            notificationSet && styles.notifyActive,
          ]}
          onPress={() => setShowNotify(true)}
          activeOpacity={0.85}
        >

          <View style={styles.notifyIcon}>
            <Ionicons
              name={
                notificationSet
                  ? "notifications"
                  : "notifications-outline"
              }
              size={24}
              color="#087F6B"
            />
          </View>

          <View style={styles.notifyInfo}>

            <Text style={styles.notifyTitle}>
              {notificationSet
                ? "Arrival alert is ON"
                : "Notify me before arrival"}
            </Text>

            <Text style={styles.notifyDescription}>
              {notificationSet
                ? `We'll notify you ${selectedTime} minutes before the train reaches your station.`
                : "Get a notification before the train reaches your station."}
            </Text>

          </View>

          <Ionicons
            name="chevron-forward"
            size={20}
            color="#71858C"
          />

        </TouchableOpacity>

        {/* ROUTE */}
        <View style={styles.sectionHeader}>

          <View>
            <Text style={styles.sectionTitle}>
              Train Route
            </Text>

            <Text style={styles.sectionSubtitle}>
              Live journey progress
            </Text>
          </View>

          <TouchableOpacity>
            <Text style={styles.mapText}>
              View Map
            </Text>
          </TouchableOpacity>

        </View>

        {/* STATIONS */}
        <View style={styles.timeline}>

          {stations.map((station, index) => {

            const isLast =
              index === stations.length - 1;

            return (
              <View
                key={station.code}
                style={styles.stationRow}
              >

                {/* TIMELINE */}
                <View style={styles.timelineColumn}>

                  {!isLast && (
                    <View
                      style={[
                        styles.timelineLine,
                        station.status === "completed" &&
                          styles.completedLine,
                      ]}
                    />
                  )}

                  <View
                    style={[
                      styles.timelineDot,
                      station.status === "completed" &&
                        styles.completedDot,
                      station.status === "current" &&
                        styles.currentDot,
                    ]}
                  >
                    {station.status === "completed" && (
                      <Ionicons
                        name="checkmark"
                        size={11}
                        color="#FFFFFF"
                      />
                    )}

                    {station.status === "current" && (
                      <View
                        style={styles.currentDotInner}
                      />
                    )}
                  </View>

                </View>

                {/* STATION INFO */}
                <View
                  style={[
                    styles.stationInfo,
                    station.status === "current" &&
                      styles.currentStationInfo,
                  ]}
                >

                  <View style={styles.stationMain}>

                    <View style={{ flex: 1 }}>

                      <Text
                        style={[
                          styles.stationName,
                          station.status === "current" &&
                            styles.currentStationName,
                        ]}
                      >
                        {station.name}
                      </Text>

                      <Text style={styles.stationCode}>
                        {station.code}
                      </Text>

                    </View>

                    <View style={styles.stationTimes}>

                      <Text style={styles.scheduledTime}>
                        {station.scheduled}
                      </Text>

                      <Text
                        style={[
                          styles.actualTime,
                          station.status === "upcoming" &&
                            styles.upcomingTime,
                        ]}
                      >
                        {station.actual}
                      </Text>

                    </View>

                  </View>

                  {station.status === "current" && (
                    <View style={styles.currentBadge}>
                      <View style={styles.currentBadgeDot} />

                      <Text style={styles.currentBadgeText}>
                        TRAIN IS HERE
                      </Text>
                    </View>
                  )}

                </View>

              </View>
            );
          })}

        </View>

        {/* LAST UPDATED */}
        <View style={styles.updatedContainer}>

          <Ionicons
            name="refresh-outline"
            size={16}
            color="#7A8C94"
          />

          <Text style={styles.updatedText}>
            Last updated 2 minutes ago
          </Text>

          <View style={styles.updatedDot} />

          <Text style={styles.updatedText}>
            Auto refresh ON
          </Text>

        </View>

        <View style={{ height: 35 }} />

      </ScrollView>

      {/* NOTIFICATION MODAL */}
      <Modal
        visible={showNotify}
        transparent
        animationType="slide"
        onRequestClose={() => setShowNotify(false)}
      >

        <View style={styles.modalOverlay}>

          <View style={styles.modal}>

            <View style={styles.modalHandle} />

            <View style={styles.modalIcon}>
              <Ionicons
                name="notifications"
                size={27}
                color="#087F6B"
              />
            </View>

            <Text style={styles.modalTitle}>
              Notify Before Arrival
            </Text>

            <Text style={styles.modalDescription}>
              We'll send you a notification when
              train 12625 is approaching your
              selected station.
            </Text>

            <Text style={styles.chooseLabel}>
              Notify me
            </Text>

            <View style={styles.timeOptions}>

              {[15, 30, 60].map((time) => (

                <TouchableOpacity
                  key={time}
                  style={[
                    styles.timeOption,
                    selectedTime === time &&
                      styles.selectedTimeOption,
                  ]}
                  onPress={() => setSelectedTime(time)}
                >

                  <Text
                    style={[
                      styles.timeOptionText,
                      selectedTime === time &&
                        styles.selectedTimeText,
                    ]}
                  >
                    {time === 60
                      ? "1 hour"
                      : `${time} min`}
                  </Text>

                </TouchableOpacity>

              ))}

            </View>

            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleSetNotification}
            >
              <Ionicons
                name="notifications-outline"
                size={21}
                color="#FFFFFF"
              />

              <Text style={styles.confirmText}>
                Set Arrival Alert
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowNotify(false)}
            >
              <Text style={styles.cancelText}>
                Cancel
              </Text>
            </TouchableOpacity>

          </View>

        </View>

      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F7FAF9",
  },

  container: {
    paddingHorizontal: 18,
    paddingBottom: 20,
  },

  /* HEADER */

  header: {
    height: 70,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EEF2F1",
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#EAF6F2",
    justifyContent: "center",
    alignItems: "center",
  },

  headerCenter: {
    flex: 1,
    marginLeft: 12,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#123E45",
  },

  liveHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
  },

  liveDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#0A9B73",
    marginRight: 5,
  },

  liveHeaderText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#087F6B",
  },

  moreButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#F0F5F4",
    justifyContent: "center",
    alignItems: "center",
  },

  /* TRAIN CARD */

  trainCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 18,
    marginTop: 17,
    borderWidth: 1,
    borderColor: "#E3EBE8",
  },

  trainTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  trainIcon: {
    width: 55,
    height: 55,
    borderRadius: 18,
    backgroundColor: "#E7F5F0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  trainInfo: {
    flex: 1,
  },

  trainNumber: {
    fontSize: 18,
    fontWeight: "800",
    color: "#123E45",
  },

  trainName: {
    fontSize: 13,
    color: "#71838C",
    marginTop: 3,
  },

  liveBadge: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 10,
    backgroundColor: "#E6F6EF",
    flexDirection: "row",
    alignItems: "center",
  },

  liveDotSmall: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#0A9B73",
    marginRight: 5,
  },

  liveBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#087F6B",
  },

  /* ROUTE HEADER */

  routeHeader: {
    marginTop: 23,
    flexDirection: "row",
    alignItems: "center",
  },

  routeTime: {
    fontSize: 17,
    fontWeight: "800",
    color: "#153E45",
  },

  routeCode: {
    fontSize: 11,
    fontWeight: "800",
    color: "#087F6B",
    marginTop: 4,
  },

  routeStation: {
    fontSize: 10,
    color: "#7A8B92",
    marginTop: 2,
  },

  routeMiddle: {
    flex: 1,
    marginHorizontal: 10,
    alignItems: "center",
  },

  routeDuration: {
    fontSize: 9,
    color: "#7B8C94",
    marginBottom: 7,
  },

  routeLine: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },

  routeDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#087F6B",
  },

  routeLineInner: {
    flex: 1,
    height: 1,
    backgroundColor: "#B9D8D0",
  },

  runningText: {
    marginTop: 6,
    fontSize: 10,
    fontWeight: "700",
    color: "#087F6B",
  },

  routeRight: {
    alignItems: "flex-end",
  },

  /* CURRENT STATUS */

  statusCard: {
    marginTop: 13,
    padding: 18,
    borderRadius: 21,
    backgroundColor: "#E7F5F0",
  },

  statusTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  statusLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: "#65817C",
    letterSpacing: 0.7,
  },

  currentLocation: {
    fontSize: 21,
    fontWeight: "800",
    color: "#123E45",
    marginTop: 5,
  },

  currentCode: {
    fontSize: 11,
    color: "#68817D",
    marginTop: 3,
  },

  liveCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  statusDivider: {
    height: 1,
    backgroundColor: "#CDE4DE",
    marginVertical: 17,
  },

  statusStats: {
    flexDirection: "row",
    alignItems: "center",
  },

  stat: {
    flex: 1,
  },

  statLabel: {
    fontSize: 9,
    color: "#69817C",
    fontWeight: "700",
  },

  onTime: {
    fontSize: 13,
    fontWeight: "800",
    color: "#087F6B",
    marginTop: 5,
  },

  delay: {
    fontSize: 13,
    fontWeight: "800",
    color: "#C9821B",
    marginTop: 5,
  },

  statValue: {
    fontSize: 12,
    fontWeight: "700",
    color: "#173E45",
    marginTop: 5,
  },

  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: "#CDE4DE",
    marginHorizontal: 10,
  },

  /* NEXT STATION */

  arrivalCard: {
    marginTop: 13,
    padding: 16,
    borderRadius: 19,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2EBE8",
    flexDirection: "row",
    alignItems: "center",
  },

  arrivalIcon: {
    width: 48,
    height: 48,
    borderRadius: 17,
    backgroundColor: "#EAF6F2",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  arrivalInfo: {
    flex: 1,
  },

  arrivalLabel: {
    fontSize: 9,
    fontWeight: "800",
    color: "#829198",
  },

  arrivalStation: {
    fontSize: 16,
    fontWeight: "800",
    color: "#143E45",
    marginTop: 4,
  },

  arrivalCode: {
    fontSize: 10,
    color: "#087F6B",
    marginTop: 2,
    fontWeight: "700",
  },

  arrivalTime: {
    alignItems: "flex-end",
  },

  arrivalEtaLabel: {
    fontSize: 9,
    color: "#87959B",
  },

  arrivalEta: {
    fontSize: 16,
    fontWeight: "800",
    color: "#143E45",
    marginTop: 3,
  },

  arrivalIn: {
    fontSize: 10,
    fontWeight: "700",
    color: "#087F6B",
    marginTop: 3,
  },

  /* NOTIFICATION */

  notifyCard: {
    marginTop: 13,
    padding: 15,
    borderRadius: 19,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#BFE2D8",
    flexDirection: "row",
    alignItems: "center",
  },

  notifyActive: {
    backgroundColor: "#EAF7F2",
  },

  notifyIcon: {
    width: 45,
    height: 45,
    borderRadius: 15,
    backgroundColor: "#E5F5F0",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },

  notifyInfo: {
    flex: 1,
  },

  notifyTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#123E45",
  },

  notifyDescription: {
    fontSize: 10,
    lineHeight: 15,
    color: "#72848C",
    marginTop: 4,
    paddingRight: 5,
  },

  /* SECTION */

  sectionHeader: {
    marginTop: 27,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#123E45",
  },

  sectionSubtitle: {
    fontSize: 11,
    color: "#7A8B92",
    marginTop: 3,
  },

  mapText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#087F6B",
  },

  /* TIMELINE */

  timeline: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 17,
    borderWidth: 1,
    borderColor: "#E3EBE8",
  },

  stationRow: {
    minHeight: 76,
    flexDirection: "row",
  },

  timelineColumn: {
    width: 30,
    alignItems: "center",
    position: "relative",
  },

  timelineLine: {
    position: "absolute",
    top: 18,
    bottom: -2,
    width: 2,
    backgroundColor: "#DDE8E5",
  },

  completedLine: {
    backgroundColor: "#087F6B",
  },

  timelineDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#DCE7E4",
    zIndex: 2,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },

  completedDot: {
    backgroundColor: "#087F6B",
  },

  currentDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#D7F0E9",
    borderWidth: 4,
    borderColor: "#087F6B",
  },

  currentDotInner: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#FFFFFF",
  },

  stationInfo: {
    flex: 1,
    marginLeft: 9,
    paddingBottom: 12,
  },

  currentStationInfo: {
    backgroundColor: "#EDF8F4",
    borderRadius: 13,
    padding: 10,
    marginTop: -7,
    marginBottom: 5,
  },

  stationMain: {
    flexDirection: "row",
    alignItems: "center",
  },

  stationName: {
    fontSize: 13,
    fontWeight: "700",
    color: "#536C75",
  },

  currentStationName: {
    color: "#123E45",
    fontWeight: "800",
  },

  stationCode: {
    fontSize: 9,
    color: "#8A989E",
    marginTop: 2,
  },

  stationTimes: {
    alignItems: "flex-end",
  },

  scheduledTime: {
    fontSize: 10,
    color: "#89969C",
  },

  actualTime: {
    fontSize: 10,
    fontWeight: "700",
    color: "#087F6B",
    marginTop: 3,
  },

  upcomingTime: {
    color: "#A0AAAE",
  },

  currentBadge: {
    alignSelf: "flex-start",
    marginTop: 6,
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 7,
    backgroundColor: "#D9F2E9",
    flexDirection: "row",
    alignItems: "center",
  },

  currentBadgeDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#087F6B",
    marginRight: 4,
  },

  currentBadgeText: {
    fontSize: 8,
    fontWeight: "800",
    color: "#087F6B",
  },

  /* UPDATED */

  updatedContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 17,
  },

  updatedText: {
    fontSize: 10,
    color: "#7C8D94",
    marginLeft: 5,
  },

  updatedDot: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: "#AAB5B9",
    marginHorizontal: 8,
  },

  /* MODAL */

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(10, 30, 30, 0.4)",
    justifyContent: "flex-end",
  },

  modal: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 22,
    paddingTop: 12,
    paddingBottom: 30,
  },

  modalHandle: {
    width: 42,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#D5DEDC",
    alignSelf: "center",
    marginBottom: 22,
  },

  modalIcon: {
    width: 56,
    height: 56,
    borderRadius: 19,
    backgroundColor: "#E5F5F0",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },

  modalTitle: {
    textAlign: "center",
    fontSize: 21,
    fontWeight: "800",
    color: "#123E45",
    marginTop: 14,
  },

  modalDescription: {
    textAlign: "center",
    fontSize: 12,
    lineHeight: 18,
    color: "#71838B",
    marginTop: 8,
    paddingHorizontal: 15,
  },

  chooseLabel: {
    fontSize: 13,
    fontWeight: "800",
    color: "#143E45",
    marginTop: 25,
    marginBottom: 11,
  },

  timeOptions: {
    flexDirection: "row",
    gap: 10,
  },

  timeOption: {
    flex: 1,
    height: 48,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#DDE7E4",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAFCFB",
  },

  selectedTimeOption: {
    backgroundColor: "#E5F5F0",
    borderColor: "#087F6B",
  },

  timeOptionText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#667B83",
  },

  selectedTimeText: {
    color: "#087F6B",
  },

  confirmButton: {
    height: 55,
    borderRadius: 16,
    backgroundColor: "#087F6B",
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  confirmText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },

  cancelButton: {
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },

  cancelText: {
    color: "#687D85",
    fontSize: 13,
    fontWeight: "700",
  },
});