import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SearchTrainScreen() {
  const [train, setTrain] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("10 Sep 2026");

  const recentSearches = [
    {
      number: "12625",
      station: "Kollam Jn",
      date: "10 Sep 2026",
    },
    {
      number: "16346",
      station: "Trivandrum Central",
      date: "10 Sep 2026",
    },
    {
      number: "12627",
      station: "Ernakulam Jn",
      date: "11 Sep 2026",
    },
  ];

  const popularTrains = [
    {
      number: "12625",
      name: "Kerala Express",
      route: "Trivandrum Central → New Delhi",
    },
    {
      number: "16346",
      name: "Netravati Express",
      route: "Trivandrum Central → Mangalore",
    },
    {
      number: "12627",
      name: "Ernakulam Express",
      route: "Trivandrum Central → Ernakulam Jn",
    },
  ];

  const handleSearch = () => {
    if (!train.trim()) {
      alert("Please enter train number or name");
      return;
    }

    console.log({
      train,
      from,
      to,
      date,
    });

    // Later:
    // axios.get("/trains/search", ...)
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.brandContainer}>
            <View style={styles.trainLogo}>
              <Ionicons name="train" size={30} color="#087F6B" />
            </View>

            <View>
              <Text style={styles.brand}>WhereIsMyTrain</Text>
              <Text style={styles.tagline}>
                Track • Search • Stay Ahead
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.profileButton}>
            <Ionicons
              name="person"
              size={23}
              color="#278C78"
            />
          </TouchableOpacity>
        </View>

        {/* HERO */}
        <View style={styles.hero}>
          <View style={styles.heroTextContainer}>
            <Text style={styles.heroTitle}>
              Find Your Train
            </Text>

            <Text style={styles.heroTitle}>
              Track it in Real Time
            </Text>

            <Text style={styles.heroDescription}>
              Search for a train and get live status,
              route, and arrival updates.
            </Text>
          </View>

          <View style={styles.heroTrain}>
            <Ionicons
              name="train"
              size={90}
              color="#087F6B"
            />
          </View>
        </View>

        {/* SEARCH CARD */}
        <View style={styles.searchCard}>

          {/* TRAIN */}
          <View style={styles.inputRow}>
            <View style={styles.inputIcon}>
              <Ionicons
                name="train"
                size={24}
                color="#087F6B"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>
                Train Number or Name
              </Text>

              <TextInput
                value={train}
                onChangeText={setTrain}
                placeholder="e.g. 12625 or Kerala Express"
                placeholderTextColor="#81909A"
                style={styles.input}
              />
            </View>

            {train.length > 0 && (
              <TouchableOpacity onPress={() => setTrain("")}>
                <Ionicons
                  name="close"
                  size={22}
                  color="#7A8992"
                />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.divider} />

          {/* FROM */}
          <View style={styles.inputRow}>
            <View style={styles.inputIcon}>
              <Ionicons
                name="location"
                size={24}
                color="#087F6B"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>
                From Station (Optional)
              </Text>

              <TextInput
                value={from}
                onChangeText={setFrom}
                placeholder="e.g. Trivandrum Central"
                placeholderTextColor="#81909A"
                style={styles.input}
              />
            </View>

            {from.length > 0 && (
              <TouchableOpacity onPress={() => setFrom("")}>
                <Ionicons
                  name="close"
                  size={22}
                  color="#7A8992"
                />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.divider} />

          {/* TO */}
          <View style={styles.inputRow}>
            <View style={styles.inputIcon}>
              <Ionicons
                name="location"
                size={24}
                color="#087F6B"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>
                To Station
              </Text>

              <TextInput
                value={to}
                onChangeText={setTo}
                placeholder="e.g. Kollam Jn"
                placeholderTextColor="#81909A"
                style={styles.input}
              />
            </View>

            {to.length > 0 && (
              <TouchableOpacity onPress={() => setTo("")}>
                <Ionicons
                  name="close"
                  size={22}
                  color="#7A8992"
                />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.divider} />

          {/* DATE */}
          <TouchableOpacity style={styles.inputRow}>
            <View style={styles.inputIcon}>
              <Ionicons
                name="calendar"
                size={24}
                color="#087F6B"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>
                Journey Date
              </Text>

              <Text style={styles.dateText}>
                {date}
              </Text>
            </View>

            <Ionicons
              name="calendar-outline"
              size={23}
              color="#71818C"
            />
          </TouchableOpacity>

          {/* SEARCH BUTTON */}
          <TouchableOpacity
            style={styles.searchButton}
            onPress={handleSearch}
            activeOpacity={0.8}
          >
            <Ionicons
              name="search"
              size={24}
              color="#FFFFFF"
            />

            <Text style={styles.searchButtonText}>
              Search Train
            </Text>
          </TouchableOpacity>
        </View>

        {/* RECENT SEARCHES */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <Ionicons
              name="time-outline"
              size={27}
              color="#647783"
            />

            <Text style={styles.sectionTitle}>
              Recent Searches
            </Text>
          </View>

          <TouchableOpacity>
            <Text style={styles.clearText}>
              Clear All
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScroll}
        >
          {recentSearches.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.recentCard}
            >
              <View style={styles.recentIcon}>
                <Ionicons
                  name="train"
                  size={22}
                  color="#087F6B"
                />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.recentNumber}>
                  {item.number}
                </Text>

                <Text style={styles.recentStation}>
                  {item.station}
                </Text>

                <Text style={styles.recentDate}>
                  {item.date}
                </Text>
              </View>

              <Ionicons
                name="chevron-forward"
                size={20}
                color="#607682"
              />
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* POPULAR TRAINS */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <Ionicons
              name="star-outline"
              size={27}
              color="#647783"
            />

            <Text style={styles.sectionTitle}>
              Popular Trains
            </Text>
          </View>

          <TouchableOpacity>
            <Text style={styles.clearText}>
              View All
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.popularContainer}>
          {popularTrains.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.popularCard}
            >
              <View style={styles.popularIcon}>
                <Ionicons
                  name="train"
                  size={23}
                  color="#087F6B"
                />
              </View>

              <View style={styles.popularInfo}>
                <View style={styles.trainNameRow}>
                  <Text style={styles.trainNumber}>
                    {item.number}
                  </Text>

                  <Text style={styles.trainName}>
                    {item.name}
                  </Text>
                </View>

                <Text style={styles.route}>
                  {item.route}
                </Text>
              </View>

              <View style={styles.dailyBadge}>
                <Text style={styles.dailyText}>
                  Runs Daily
                </Text>
              </View>

              <Ionicons
                name="chevron-forward"
                size={21}
                color="#6C7C85"
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* BOTTOM SPACE */}
        <View style={{ height: 30 }} />
      </ScrollView>

      {/* BOTTOM NAVIGATION */}
      <View style={styles.bottomNav}>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons
            name="search"
            size={25}
            color="#087F6B"
          />
          <Text style={styles.activeNavText}>
            Search
          </Text>
          <View style={styles.activeLine} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons
            name="train-outline"
            size={25}
            color="#687985"
          />
          <Text style={styles.navText}>
            Live Status
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons
            name="notifications-outline"
            size={25}
            color="#687985"
          />
          <Text style={styles.navText}>
            Alerts
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons
            name="menu-outline"
            size={27}
            color="#687985"
          />
          <Text style={styles.navText}>
            More
          </Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAF9",
  },

  container: {
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 100,
  },

  /* HEADER */

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  brandContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  trainLogo: {
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: "#E3F3EE",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  brand: {
    fontSize: 22,
    fontWeight: "800",
    color: "#103E40",
  },

  tagline: {
    marginTop: 3,
    fontSize: 13,
    color: "#72838C",
  },

  profileButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E3F3EE",
    alignItems: "center",
    justifyContent: "center",
  },

  /* HERO */

  hero: {
    height: 190,
    borderRadius: 22,
    backgroundColor: "#E1F1EA",
    overflow: "hidden",
    padding: 22,
    marginBottom: 20,
    flexDirection: "row",
  },

  heroTextContainer: {
    flex: 1,
    zIndex: 2,
  },

  heroTitle: {
    fontSize: 24,
    lineHeight: 29,
    fontWeight: "800",
    color: "#103E40",
  },

  heroDescription: {
    marginTop: 12,
    fontSize: 14,
    lineHeight: 21,
    color: "#285D60",
    maxWidth: 245,
  },

  heroTrain: {
    position: "absolute",
    right: 15,
    bottom: 15,
    opacity: 0.9,
  },

  /* SEARCH CARD */

  searchCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 18,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
    marginBottom: 28,
  },

  inputRow: {
    minHeight: 68,
    flexDirection: "row",
    alignItems: "center",
  },

  inputIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#EAF6F2",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  inputContainer: {
    flex: 1,
  },

  inputLabel: {
    fontSize: 13,
    color: "#526D78",
    marginBottom: 5,
  },

  input: {
    fontSize: 16,
    color: "#183E45",
    padding: 0,
  },

  dateText: {
    fontSize: 16,
    color: "#183E45",
  },

  divider: {
    height: 1,
    backgroundColor: "#E7ECEC",
    marginLeft: 62,
  },

  searchButton: {
    height: 58,
    marginTop: 16,
    borderRadius: 18,
    backgroundColor: "#087F6B",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  searchButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },

  /* SECTIONS */

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 13,
    marginTop: 4,
  },

  sectionTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "750",
    color: "#123D43",
  },

  clearText: {
    color: "#087F6B",
    fontSize: 14,
    fontWeight: "700",
  },

  /* RECENT */

  horizontalScroll: {
    paddingBottom: 25,
    gap: 12,
  },

  recentCard: {
    width: 190,
    minHeight: 105,
    borderRadius: 18,
    backgroundColor: "#EAF6F2",
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  recentIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  recentNumber: {
    fontSize: 16,
    fontWeight: "800",
    color: "#153E45",
  },

  recentStation: {
    fontSize: 12,
    color: "#5B727B",
    marginTop: 3,
  },

  recentDate: {
    fontSize: 11,
    color: "#71858C",
    marginTop: 3,
  },

  /* POPULAR */

  popularContainer: {
    gap: 10,
  },

  popularCard: {
    minHeight: 82,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E9E8",
    padding: 13,
    flexDirection: "row",
    alignItems: "center",
  },

  popularIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#EAF6F2",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  popularInfo: {
    flex: 1,
  },

  trainNameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  trainNumber: {
    fontSize: 15,
    fontWeight: "800",
    color: "#143E45",
  },

  trainName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#143E45",
    flexShrink: 1,
  },

  route: {
    marginTop: 7,
    fontSize: 12,
    color: "#71838C",
  },

  dailyBadge: {
    backgroundColor: "#E5F6EE",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    marginRight: 8,
  },

  dailyText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#07805F",
  },

  /* BOTTOM NAV */

  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 10,
    right: 10,
    height: 78,
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 8,
  },

  navItem: {
    height: 68,
    minWidth: 72,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  navText: {
    marginTop: 4,
    fontSize: 11,
    color: "#687985",
  },

  activeNavText: {
    marginTop: 4,
    fontSize: 11,
    fontWeight: "700",
    color: "#087F6B",
  },

  activeLine: {
    position: "absolute",
    bottom: 0,
    width: 30,
    height: 3,
    borderRadius: 3,
    backgroundColor: "#087F6B",
  },
});