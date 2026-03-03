import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './src/types';
import PostsScreen from './src/screens/PostsScreen';
import CommentsScreen from './src/screens/CommentsScreen';
import EditCommentScreen from './src/screens/EditCommentScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="#6c63ff" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#6c63ff' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: '700' },
            contentStyle: { backgroundColor: '#f0f2f5' },
          }}>
          <Stack.Screen
            name="Posts"
            component={PostsScreen}
            options={{ title: 'All Posts' }}
          />
          <Stack.Screen
            name="Comments"
            component={CommentsScreen}
            options={{ title: 'Comments' }}
          />
          <Stack.Screen
            name="EditComment"
            component={EditCommentScreen}
            options={{ title: 'Edit Comment' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
