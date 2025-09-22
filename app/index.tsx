
import React, { useState } from 'react';
import { Text, View, ScrollView, Alert } from 'react-native';
import { colors, commonStyles } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import UserInput from '../components/UserInput';
import StatusCard, { UserStatus } from '../components/StatusCard';
import { checkDiscordStatus, StatusCheckResult } from '../utils/discordStatusChecker';
import Icon from '../components/Icon';

export default function MainScreen() {
  const [loading, setLoading] = useState(false);
  const [checkedUsers, setCheckedUsers] = useState<UserStatus[]>([]);

  const handleCheckStatus = async (userIdOrUsername: string) => {
    console.log('Starting status check for:', userIdOrUsername);
    setLoading(true);

    try {
      const result: StatusCheckResult = await checkDiscordStatus(userIdOrUsername);
      
      if (result.error) {
        Alert.alert('Error', result.error);
        return;
      }

      const userStatus: UserStatus = {
        userId: result.userId,
        username: result.username,
        displayedStatus: result.displayedStatus,
        actualStatus: result.actualStatus,
        isHiding: result.isHiding,
        lastSeen: result.lastSeen,
        activity: result.activity,
      };

      // Add to the beginning of the list, remove duplicates
      setCheckedUsers(prev => {
        const filtered = prev.filter(user => user.userId !== userStatus.userId);
        return [userStatus, ...filtered];
      });

      console.log('Status check completed successfully');
    } catch (error) {
      console.error('Error checking status:', error);
      Alert.alert('Error', 'Failed to check user status. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView 
        style={commonStyles.wrapper}
        contentContainerStyle={commonStyles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ alignItems: 'center', marginBottom: 32 }}>
          <Icon 
            name="eye" 
            size={48} 
            color={colors.primary} 
            style={{ marginBottom: 16 }}
          />
          <Text style={commonStyles.title}>Discord Status Checker</Text>
          <Text style={commonStyles.subtitle}>
            Discover if someone is really online, even when they&apos;re hiding their status
          </Text>
        </View>

        <UserInput onSubmit={handleCheckStatus} loading={loading} />

        {checkedUsers.length > 0 && (
          <View style={{ width: '100%' }}>
            <Text style={[commonStyles.text, { 
              fontSize: 18, 
              fontWeight: '700', 
              marginBottom: 16,
              textAlign: 'left',
              color: colors.text 
            }]}>
              Recent Checks
            </Text>
            
            {checkedUsers.map((userStatus, index) => (
              <StatusCard key={`${userStatus.userId}-${index}`} userStatus={userStatus} />
            ))}
          </View>
        )}

        {checkedUsers.length === 0 && !loading && (
          <View style={{ 
            alignItems: 'center', 
            marginTop: 40,
            padding: 20,
            backgroundColor: colors.backgroundAlt,
            borderRadius: 12,
            width: '100%'
          }}>
            <Icon name="search" size={32} color={colors.grey} style={{ marginBottom: 12 }} />
            <Text style={[commonStyles.text, { color: colors.textSecondary }]}>
              Enter a Discord User ID or username to get started
            </Text>
            <Text style={[commonStyles.text, { 
              color: colors.textSecondary, 
              fontSize: 14,
              marginTop: 8,
              textAlign: 'center'
            }]}>
              Try these sample IDs: 123456789012345678, GamerPro2024, StealthyNinja
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
