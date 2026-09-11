import React, { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

// ============================================
// TYPES
// ============================================

type MetricCardProps = {
  title: string;
  value: string;
  subtitle: string;
};

type ActionButtonProps = {
  icon: string;
  title: string;
  onPress: () => void;
};

type Activity = {
  title: string;
  details: string;
};


// ============================================
// REUSABLE METRIC CARD
// ============================================

function MetricCard({
  title,
  value,
  subtitle,
}: MetricCardProps) {
  return (
    <View style={styles.metricCard}>
      <Text style={styles.metricTitle}>
        {title}
      </Text>

      <Text style={styles.metricValue}>
        {value}
      </Text>

      <Text style={styles.metricSubtitle}>
        {subtitle}
      </Text>
    </View>
  );
}


// ============================================
// REUSABLE ACTION BUTTON
// ============================================

function ActionButton({
  icon,
  title,
  onPress,
}: ActionButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.actionButton,
        pressed && styles.actionPressed,
      ]}
    >
      <Text style={styles.actionIcon}>
        {icon}
      </Text>

      <Text style={styles.actionText}>
        {title}
      </Text>
    </Pressable>
  );
}


// ============================================
// MAIN DASHBOARD
// ============================================

export default function HomeScreen() {

  // ==========================================
  // DASHBOARD STATE
  // ==========================================

  const [orders, setOrders] = useState(128);

  const [customers, setCustomers] = useState(1248);

  const [revenue, setRevenue] = useState(12450);

  const [activities, setActivities] = useState<Activity[]>([
    {
      title: "New order received",
      details: "Order #1024 • 5 minutes ago",
    },
    {
      title: "Payment completed",
      details: "₱850.00 • 20 minutes ago",
    },
    {
      title: "New customer registered",
      details: "Maria Santos • 1 hour ago",
    },
  ]);


  // ==========================================
  // ADD ORDER
  // ==========================================

  const addOrder = () => {

    const newOrderNumber = orders + 1;

    const orderPrice = 250;

    setOrders(newOrderNumber);

    setRevenue(revenue + orderPrice);

    const newActivity: Activity = {
      title: "New order added",
      details: `Order #${newOrderNumber} • Just now`,
    };

    setActivities((previousActivities) => [
      newActivity,
      ...previousActivities,
    ]);

    Alert.alert(
      "Order Added",
      `Order #${newOrderNumber} was successfully added.\n\nAmount: ₱${orderPrice}`
    );
  };


  // ==========================================
  // ADD CUSTOMER
  // ==========================================

  const addCustomer = () => {

    const newCustomerNumber = customers + 1;

    setCustomers(newCustomerNumber);

    const newActivity: Activity = {
      title: "New customer registered",
      details: `Customer #${newCustomerNumber} • Just now`,
    };

    setActivities((previousActivities) => [
      newActivity,
      ...previousActivities,
    ]);

    Alert.alert(
      "Customer Added",
      `Customer #${newCustomerNumber} was successfully registered.`
    );
  };


  // ==========================================
  // SHOW REPORTS
  // ==========================================

  const showReports = () => {

    Alert.alert(
      "Dashboard Report",

      `Orders: ${orders}\n\n` +
      `Customers: ${customers.toLocaleString()}\n\n` +
      `Revenue: ₱${revenue.toLocaleString()}\n\n` +
      `Recent Activities: ${activities.length}`
    );
  };


  // ==========================================
  // SHOW PROFILE
  // ==========================================

  const showProfile = () => {

    Alert.alert(
      "My Profile",

      "Name: Edieson Malintad\n\n" +
      "Role: Administrator\n\n" +
      "Status: Active"
    );
  };


  // ==========================================
  // VIEW ALL ACTIVITIES
  // ==========================================

  const viewAllActivities = () => {

    let message = "";

    activities.forEach((activity, index) => {

      message += `${index + 1}. ${activity.title}\n`;

      message += `${activity.details}\n\n`;
    });

    Alert.alert(
      "Recent Activity",
      message
    );
  };


  // ==========================================
  // RESET DASHBOARD
  // ==========================================

  const resetDashboard = () => {

    setOrders(128);

    setCustomers(1248);

    setRevenue(12450);

    setActivities([
      {
        title: "New order received",
        details: "Order #1024 • 5 minutes ago",
      },
      {
        title: "Payment completed",
        details: "₱850.00 • 20 minutes ago",
      },
      {
        title: "New customer registered",
        details: "Maria Santos • 1 hour ago",
      },
    ]);

    Alert.alert(
      "Dashboard Reset",
      "The dashboard has been reset to its original data."
    );
  };


  // ==========================================
  // SCREEN
  // ==========================================

  return (
    <View style={styles.container}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        {/* ==================================
            HEADER
        ================================== */}

        <View style={styles.header}>

          <View>

            <Text style={styles.greeting}>
              Good morning 👋
            </Text>

            <Text style={styles.screenTitle}>
              Dashboard
            </Text>

          </View>


          {/* PROFILE BUTTON */}

          <Pressable
            onPress={showProfile}
            style={({ pressed }) => [
              styles.profileButton,
              pressed && styles.actionPressed,
            ]}
          >

            <Text style={styles.profileIcon}>
              👤
            </Text>

          </Pressable>

        </View>


        {/* ==================================
            OVERVIEW
        ================================== */}

        <Text style={styles.sectionTitle}>
          Overview
        </Text>


        {/* TWO CARDS IN ONE ROW */}

        <View style={styles.metricsRow}>

          <MetricCard
            title="Orders"
            value={orders.toString()}
            subtitle="+12% this week"
          />


          <MetricCard
            title="Revenue"
            value={`₱${(revenue / 1000).toFixed(1)}K`}
            subtitle="+8% this week"
          />

        </View>


        {/* THIRD METRIC CARD */}

        <MetricCard
          title="Customers"
          value={customers.toLocaleString()}
          subtitle="+24 new customers"
        />


        {/* ==================================
            QUICK ACTIONS
        ================================== */}

        <Text style={styles.sectionTitle}>
          Quick Actions
        </Text>


        <View style={styles.actionsContainer}>

          {/* ADD ORDER */}

          <ActionButton
            icon="＋"
            title="Add Order"
            onPress={addOrder}
          />


          {/* REPORTS */}

          <ActionButton
            icon="▣"
            title="Reports"
            onPress={showReports}
          />


          {/* CUSTOMERS */}

          <ActionButton
            icon="♙"
            title="Customers"
            onPress={addCustomer}
          />

        </View>


        {/* ==================================
            RECENT ACTIVITY HEADER
        ================================== */}

        <View style={styles.activityHeader}>

          <Text style={styles.sectionTitle}>
            Recent Activity
          </Text>


          <Pressable
            onPress={viewAllActivities}
          >

            <Text style={styles.viewAll}>
              View all
            </Text>

          </Pressable>

        </View>


        {/* ==================================
            RECENT ACTIVITY CARD
        ================================== */}

        <View style={styles.activityCard}>

          {activities.slice(0, 5).map(
            (activity, index) => (

              <React.Fragment key={index}>

                <View style={styles.activityItem}>

                  {/* DOT */}

                  <View style={styles.activityDot} />


                  {/* ACTIVITY TEXT */}

                  <View style={styles.activityContent}>

                    <Text style={styles.activityTitle}>
                      {activity.title}
                    </Text>

                    <Text style={styles.activityTime}>
                      {activity.details}
                    </Text>

                  </View>

                </View>


                {/* DIVIDER */}

                {index <
                  Math.min(activities.length, 5) - 1 && (
                  <View style={styles.divider} />
                )}

              </React.Fragment>

            )
          )}

        </View>


        {/* ==================================
            RESET BUTTON
        ================================== */}

        <Pressable
          onPress={resetDashboard}
          style={({ pressed }) => [
            styles.resetButton,
            pressed && styles.actionPressed,
          ]}
        >

          <Text style={styles.resetText}>
            Reset Dashboard
          </Text>

        </Pressable>


        {/* BOTTOM SPACE */}

        <View style={styles.bottomSpace} />

      </ScrollView>

    </View>
  );
}


// ============================================
// STYLES
// ============================================

const styles = StyleSheet.create({

  // ==========================================
  // MAIN SCREEN
  // ==========================================

  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },


  scrollContent: {
    padding: 20,
    paddingTop: 55,
  },


  // ==========================================
  // HEADER
  // ==========================================

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 28,
  },


  greeting: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 4,
  },


  screenTitle: {
    fontSize: 30,
    fontWeight: "700",
    color: "#111827",
  },


  // ==========================================
  // PROFILE
  // ==========================================

  profileButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E8EEF9",

    justifyContent: "center",
    alignItems: "center",
  },


  profileIcon: {
    fontSize: 22,
  },


  // ==========================================
  // SECTION TITLE
  // ==========================================

  sectionTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: "#111827",

    marginTop: 4,
    marginBottom: 12,
  },


  // ==========================================
  // METRIC CARDS
  // ==========================================

  metricsRow: {
    flexDirection: "row",
    gap: 12,
  },


  metricCard: {
    flex: 1,

    backgroundColor: "#FFFFFF",

    borderRadius: 16,

    padding: 18,

    marginBottom: 12,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.06,

    shadowRadius: 5,

    elevation: 2,
  },


  metricTitle: {
    fontSize: 14,
    color: "#6B7280",

    marginBottom: 8,
  },


  metricValue: {
    fontSize: 25,

    fontWeight: "700",

    color: "#111827",

    marginBottom: 5,
  },


  metricSubtitle: {
    fontSize: 12,

    color: "#4F46E5",
  },


  // ==========================================
  // QUICK ACTIONS
  // ==========================================

  actionsContainer: {
    flexDirection: "row",

    gap: 10,

    marginBottom: 28,
  },


  actionButton: {
    flex: 1,

    backgroundColor: "#FFFFFF",

    borderRadius: 14,

    paddingVertical: 16,

    alignItems: "center",

    justifyContent: "center",

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.05,

    shadowRadius: 4,

    elevation: 2,
  },


  actionIcon: {
    fontSize: 23,

    color: "#4F46E5",

    marginBottom: 7,
  },


  actionText: {
    fontSize: 12,

    fontWeight: "600",

    color: "#374151",

    textAlign: "center",
  },


  // ==========================================
  // BUTTON PRESSED EFFECT
  // ==========================================

  actionPressed: {
    opacity: 0.6,

    transform: [
      {
        scale: 0.97,
      },
    ],
  },


  // ==========================================
  // ACTIVITY HEADER
  // ==========================================

  activityHeader: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",
  },


  viewAll: {
    fontSize: 13,

    fontWeight: "600",

    color: "#4F46E5",

    marginBottom: 12,
  },


  // ==========================================
  // ACTIVITY CARD
  // ==========================================

  activityCard: {
    backgroundColor: "#FFFFFF",

    borderRadius: 16,

    paddingHorizontal: 16,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.05,

    shadowRadius: 4,

    elevation: 2,
  },


  activityItem: {
    flexDirection: "row",

    alignItems: "center",

    paddingVertical: 16,
  },


  activityDot: {
    width: 10,

    height: 10,

    borderRadius: 5,

    backgroundColor: "#4F46E5",

    marginRight: 13,
  },


  activityContent: {
    flex: 1,
  },


  activityTitle: {
    fontSize: 14,

    fontWeight: "600",

    color: "#111827",

    marginBottom: 4,
  },


  activityTime: {
    fontSize: 12,

    color: "#6B7280",
  },


  divider: {
    height: 1,

    backgroundColor: "#EEF0F4",
  },


  // ==========================================
  // RESET BUTTON
  // ==========================================

  resetButton: {
    marginTop: 20,

    backgroundColor: "#FFFFFF",

    borderRadius: 12,

    paddingVertical: 13,

    alignItems: "center",

    borderWidth: 1,

    borderColor: "#E5E7EB",
  },


  resetText: {
    fontSize: 13,

    fontWeight: "600",

    color: "#6B7280",
  },


  // ==========================================
  // BOTTOM SPACE
  // ==========================================

  bottomSpace: {
    height: 30,
  },

});