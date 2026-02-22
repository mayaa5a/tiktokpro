import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, View, StyleSheet } from 'react-native';

import { AppStateProvider } from './src/context/AppStateContext';
import { HomeScreen } from './src/screens/HomeScreen';
import { FriendsScreen } from './src/screens/FriendsScreen';
import { CreateScreen } from './src/screens/CreateScreen';
import { InboxScreen } from './src/screens/InboxScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { SavedScreen } from './src/screens/SavedScreen';
import { FolderDetailScreen } from './src/screens/FolderDetailScreen';
import { ExportResultsScreen } from './src/screens/ExportResultsScreen';

const Tab = createBottomTabNavigator();
const ProfileStack = createNativeStackNavigator();

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#000' },
        headerTintColor: '#fff',
        contentStyle: { backgroundColor: '#000' },
      }}
    >
      <ProfileStack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
      <ProfileStack.Screen name="Saved" component={SavedScreen} options={{ title: 'Saved' }} />
      <ProfileStack.Screen name="FolderDetail" component={FolderDetailScreen} options={{ title: 'Folder' }} />
      <ProfileStack.Screen name="ExportResults" component={ExportResultsScreen} options={{ headerShown: false }} />
    </ProfileStack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppStateProvider>
        <NavigationContainer>
          <StatusBar style="light" />
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
              tabBarStyle: {
                backgroundColor: '#000',
                borderTopColor: '#111',
                height: 68,
              },
              tabBarActiveTintColor: '#fff',
              tabBarInactiveTintColor: '#777',
            }}
          >
            <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="home" size={size} color={color} />
                ),
              }}
            />
            <Tab.Screen
              name="Friends"
              component={FriendsScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="people" size={size} color={color} />
                ),
              }}
            />
            <Tab.Screen
              name="Create"
              component={CreateScreen}
              options={{
                tabBarLabel: '',
                tabBarButton: (props) => (
                  <TouchableOpacity {...props} style={styles.createButtonWrapper}>
                    <View style={styles.createButton}>
                      <Ionicons name="add" size={28} color="#000" />
                    </View>
                  </TouchableOpacity>
                ),
              }}
            />
            <Tab.Screen
              name="Inbox"
              component={InboxScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="chatbubble" size={size} color={color} />
                ),
              }}
            />
            <Tab.Screen
              name="Profile"
              component={ProfileStackScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="person" size={size} color={color} />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </AppStateProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  createButtonWrapper: {
    top: -12,
  },
  createButton: {
    width: 52,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
