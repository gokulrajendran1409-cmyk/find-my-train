import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const trains = [
  {
    number: "12625",
    name: "Kerala Express",
    from: "Trivandrum Central",
    fromCode: "TVC",
    departure: "11:15 AM",
    to: "New Delhi",
    toCode: "NDLS",
    arrival: "11:35 AM",
    duration: "50h 20m",
    type: "Superfast",
    status: "On Time",
    runs: "Daily",
  },
  {
    number: "16346",
    name: "Netravati Express",
    from: "Trivandrum Central",
    fromCode: "TVC",
    departure: "09:00 AM",
    to: "Lokmanya Tilak",
    toCode: "LTT",
    arrival: "01:25 PM",
    duration: "28h 25m",
    type: "Express",
    status: "On Time",
    runs: "Daily",
  },
  {
    number: "12627",
    name: "Karnataka Express",
    from: "Trivandrum Central",
    fromCode: "TVC",
    departure: "07:10 PM",
    to: "New Delhi",
    toCode: "NDLS",
    arrival: "10:30 PM",
    duration: "51h 20m",
    type: "Superfast",
    status: "Delayed 12m",
    runs: "Daily",
  },
  {
    number: "12431",
    name: "Rajdhani Express",
    from: "Trivandrum Central",
    fromCode: "TVC",
    departure: "07:45 PM",
    to: "Hazrat Nizamuddin",
    toCode: "NZM",
    arrival: "06:30 AM",
    duration: "34h 45m",
    type: "Rajdhani",
    status: "On Time",
    runs: "Mon, Wed, Fri",
  },
];

export default function TrainResultsScreen({ navigation }) {
  const handleTrainPress = (train) => {
    console.log("Selected train:", train);

    // Later:
    // navigation.navigate("TrainDetails", { train });
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
            color="#143E45"
          />
        </TouchableOpacity>

        <View style={styles.headerText}>
          <Text style={styles.headerTitle}>Search Results</Text>

          <Text style={styles.headerSubtitle}>
            10 Sep 2026 • Trivandrum → New Delhi
          </Text>
        </View>

        <TouchableOpacity style={styles.filterButton}>
          <Ionicons
            name="options-outline"
            size={23}
            color="#087F6B"
          />
        </TouchableOpacity>
      </View>

      {/* SEARCH SUMMARY */}
      <View style={styles.searchSummary}>
        <View style={styles.summaryStation}>
          <Text style={styles.stationCode}>TVC</Text>
          <Text style={styles.stationName}>
            Trivandrum
          </Text>
        </View>

        <View style={styles.summaryMiddle}>
          <View style={styles.summaryLine} />

          <View style={styles.trainSmallIcon}>
            <Ionicons
              name="train"
              size={17}
              color="#087F6B"
            />
          </View>

          <View style={styles.summaryLine} />
        </View>

        <View style={styles.summaryStationRight}>
          <Text style={styles.stationCode}>NDLS</Text>
          <Text style={styles.stationName}>
            New Delhi
          </Text>
        </View>
      </View>

      {/* RESULT COUNT */}
      <View style={styles.resultHeader}>
        <View>
          <Text style={styles.resultCount}>
            {trains.length} trains found
          </Text>

          <Text style={styles.resultDescription}>
            Available trains for your journey
          </Text>
        </View>

        <TouchableOpacity style={styles.sortButton}>
          <Ionicons
            name="swap-vertical"
            size={17}
            color="#087F6B"
          />

          <Text style={styles.sortText}>
            Sort
          </Text>
        </TouchableOpacity>
      </View>

      {/* TRAIN LIST */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      >
        {trains.map((train) => (
          <TouchableOpacity
            key={train.number}
            style={styles.trainCard}
            activeOpacity={0.85}
            onPress={() => handleTrainPress(train)}
          >
            {/* TOP */}
            <View style={styles.cardTop}>
              <View style={styles.trainIdentity}>
                <View style={styles.trainIcon}>
                  <Ionicons
                    name="train"
                    size={23}
                    color="#087F6B"
                  />
                </View>

                <View>
                  <View style={styles.numberRow}>
                    <Text style={styles.trainNumber}>
                      {train.number}
                    </Text>

                    <View style={styles.typeBadge}>
                      <Text style={styles.typeText}>
                        {train.type}
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.trainName}>
                    {train.name}
                  </Text>
                </View>
              </View>

              <Ionicons
                name="chevron-forward"
                size={21}
                color="#84939A"
              />
            </View>

            {/* ROUTE */}
            <View style={styles.routeContainer}>
              {/* FROM */}
              <View style={styles.timeBlock}>
                <Text style={styles.time}>
                  {train.departure}
                </Text>

                <Text style={styles.code}>
                  {train.fromCode}
                </Text>

                <Text
                  style={styles.city}
                  numberOfLines={1}
                >
                  {train.from}
                </Text>
              </View>

              {/* JOURNEY LINE */}
              <View style={styles.journey}>
                <View style={styles.dot} />

                <View style={styles.lineContainer}>
                  <View style={styles.line} />

                  <View style={styles.durationBadge}>
                    <Text style={styles.duration}>
                      {train.duration}
                    </Text>
                  </View>

                  <View style={styles.line} />
                </View>

                <View style={styles.dot} />
              </View>

              {/* TO */}
              <View style={styles.timeBlockRight}>
                <Text style={styles.time}>
                  {train.arrival}
                </Text>

                <Text style={styles.code}>
                  {train.toCode}
                </Text>

                <Text
                  style={styles.city}
                  numberOfLines={1}
                >
                  {train.to}
                </Text>
              </View>
            </View>

            {/* BOTTOM */}
            <View style={styles.cardBottom}>
              <View style={styles.statusContainer}>
                <View
                  style={[
                    styles.statusDot,
                    train.status !== "On Time" &&
                      styles.delayedDot,
                  ]}
                />

                <Text
                  style={[
                    styles.statusText,
                    train.status !== "On Time" &&
                      styles.delayedText,
                  ]}
                >
                  {train.status}
                </Text>

                <View style={styles.verticalDivider} />

                <Text style={styles.runsText}>
                  Runs {train.runs}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.liveButton}
                onPress={() => {
                  console.log(
                    "Live status:",
                    train.number
                  );
                }}
              >
                <Ionicons
                  name="radio-outline"
                  size={16}
                  color="#087F6B"
                />

                <Text style={styles.liveText}>
                  Live
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}

        {/* INFO */}
        <View style={styles.infoCard}>
          <Ionicons
            name="information-circle-outline"
            size={21}
            color="#087F6B"
          />

          <Text style={styles.infoText}>
            Train timings shown here are scheduled
            timings. Live running status may change
            based on the latest railway updates.
          </Text>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F7FAF9",
  },

  /* HEADER */

  header: {
    height: 76,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#EDF6F3",
    alignItems: "center",
    justifyContent: "center",
  },

  headerText: {
    flex: 1,
    marginLeft: 12,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#123E45",
  },

  headerSubtitle: {
    fontSize: 12,
    color: "#75868E",
    marginTop: 4,
  },

  filterButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#EDF6F3",
    alignItems: "center",
    justifyContent: "center",
  },

  /* SEARCH SUMMARY */

  searchSummary: {
    marginHorizontal: 18,
    marginTop: 15,
    paddingHorizontal: 18,
    paddingVertical: 15,
    backgroundColor: "#E8F5F0",
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
  },

  summaryStation: {
    width: 90,
  },

  summaryStationRight: {
    width: 90,
    alignItems: "flex-end",
  },

  stationCode: {
    fontSize: 16,
    fontWeight: "800",
    color: "#123E45",
  },

  stationName: {
    fontSize: 11,
    color: "#657B83",
    marginTop: 3,
  },

  summaryMiddle: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  summaryLine: {
    height: 1,
    flex: 1,
    backgroundColor: "#A7CFC4",
  },

  trainSmallIcon: {
    width: 32,
    height: 32,
    marginHorizontal: 6,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },

  /* RESULT HEADER */

  resultHeader: {
    paddingHorizontal: 20,
    marginTop: 23,
    marginBottom: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  resultCount: {
    fontSize: 18,
    fontWeight: "800",
    color: "#143E45",
  },

  resultDescription: {
    fontSize: 12,
    color: "#7A8A92",
    marginTop: 4,
  },

  sortButton: {
    height: 38,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DDE8E5",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  sortText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#087F6B",
  },

  /* LIST */

  list: {
    paddingHorizontal: 18,
  },

  trainCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    marginBottom: 13,
    borderWidth: 1,
    borderColor: "#E4EBE9",
  },

  /* CARD TOP */

  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  trainIdentity: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  trainIcon: {
    width: 47,
    height: 47,
    borderRadius: 16,
    backgroundColor: "#E8F5F0",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },

  numberRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  trainNumber: {
    fontSize: 15,
    fontWeight: "800",
    color: "#153F46",
  },

  trainName: {
    fontSize: 13,
    fontWeight: "600",
    color: "#607681",
    marginTop: 4,
  },

  typeBadge: {
    backgroundColor: "#F0F5F4",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },

  typeText: {
    fontSize: 9,
    fontWeight: "700",
    color: "#60747C",
  },

  /* ROUTE */

  routeContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  timeBlock: {
    width: 92,
  },

  timeBlockRight: {
    width: 92,
    alignItems: "flex-end",
  },

  time: {
    fontSize: 18,
    fontWeight: "800",
    color: "#163E45",
  },

  code: {
    fontSize: 12,
    fontWeight: "700",
    color: "#087F6B",
    marginTop: 3,
  },

  city: {
    fontSize: 10,
    color: "#7B8B92",
    marginTop: 3,
  },

  journey: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#087F6B",
  },

  lineContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  line: {
    width: "100%",
    height: 1,
    backgroundColor: "#B7D5CE",
  },

  durationBadge: {
    position: "absolute",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 6,
  },

  duration: {
    fontSize: 9,
    color: "#819098",
    fontWeight: "600",
  },

  /* CARD BOTTOM */

  cardBottom: {
    marginTop: 17,
    paddingTop: 13,
    borderTopWidth: 1,
    borderTopColor: "#EEF2F1",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#0B9A72",
    marginRight: 6,
  },

  delayedDot: {
    backgroundColor: "#E19A28",
  },

  statusText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#087F6B",
  },

  delayedText: {
    color: "#C5821A",
  },

  verticalDivider: {
    width: 1,
    height: 14,
    backgroundColor: "#D9E3E0",
    marginHorizontal: 9,
  },

  runsText: {
    fontSize: 10,
    color: "#7B8A91",
  },

  liveButton: {
    height: 34,
    paddingHorizontal: 12,
    borderRadius: 11,
    backgroundColor: "#E7F5F0",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  liveText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#087F6B",
  },

  /* INFO */

  infoCard: {
    marginTop: 5,
    padding: 14,
    borderRadius: 16,
    backgroundColor: "#EDF7F4",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 9,
  },

  infoText: {
    flex: 1,
    fontSize: 11,
    lineHeight: 17,
    color: "#61777F",
  },
});