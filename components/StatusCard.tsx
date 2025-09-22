
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, commonStyles } from '../styles/commonStyles';
import Icon from './Icon';

export interface UserStatus {
  userId: string;
  username: string;
  displayedStatus: 'online' | 'offline' | 'idle' | 'invisible';
  actualStatus: 'online' | 'offline' | 'idle' | 'invisible';
  isHiding: boolean;
  lastSeen?: string;
  activity?: string;
}

interface StatusCardProps {
  userStatus: UserStatus;
}

export default function StatusCard({ userStatus }: StatusCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return colors.online;
      case 'idle':
        return colors.idle;
      case 'offline':
        return colors.offline;
      case 'invisible':
        return colors.invisible;
      default:
        return colors.grey;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return 'radio-button-on';
      case 'idle':
        return 'moon';
      case 'offline':
        return 'radio-button-off';
      case 'invisible':
        return 'eye-off';
      default:
        return 'help-circle';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online':
        return 'Online';
      case 'idle':
        return 'Idle';
      case 'offline':
        return 'Offline';
      case 'invisible':
        return 'Invisible';
      default:
        return 'Unknown';
    }
  };

  console.log('Rendering status card for user:', userStatus.username);

  return (
    <View style={[commonStyles.card, styles.card]}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Text style={styles.username}>{userStatus.username}</Text>
          <Text style={styles.userId}>ID: {userStatus.userId}</Text>
        </View>
      </View>

      <View style={styles.statusContainer}>
        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>Displayed Status:</Text>
          <View style={styles.statusIndicator}>
            <Icon
              name={getStatusIcon(userStatus.displayedStatus)}
              size={16}
              color={getStatusColor(userStatus.displayedStatus)}
            />
            <Text style={[styles.statusText, { color: getStatusColor(userStatus.displayedStatus) }]}>
              {getStatusText(userStatus.displayedStatus)}
            </Text>
          </View>
        </View>

        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>Actual Status:</Text>
          <View style={styles.statusIndicator}>
            <Icon
              name={getStatusIcon(userStatus.actualStatus)}
              size={16}
              color={getStatusColor(userStatus.actualStatus)}
            />
            <Text style={[styles.statusText, { color: getStatusColor(userStatus.actualStatus) }]}>
              {getStatusText(userStatus.actualStatus)}
            </Text>
          </View>
        </View>
      </View>

      {userStatus.isHiding && (
        <View style={styles.hidingAlert}>
          <Icon name="warning" size={20} color={colors.invisible} />
          <Text style={styles.hidingText}>
            This user is hiding their online status!
          </Text>
        </View>
      )}

      {userStatus.activity && (
        <View style={styles.activityContainer}>
          <Text style={styles.activityLabel}>Activity:</Text>
          <Text style={styles.activityText}>{userStatus.activity}</Text>
        </View>
      )}

      {userStatus.lastSeen && (
        <View style={styles.lastSeenContainer}>
          <Text style={styles.lastSeenLabel}>Last seen:</Text>
          <Text style={styles.lastSeenText}>{userStatus.lastSeen}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  userId: {
    fontSize: 14,
    color: colors.textSecondary,
    fontFamily: 'monospace',
  },
  statusContainer: {
    marginBottom: 12,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  hidingAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.invisible + '20',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    gap: 8,
  },
  hidingText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.invisible,
    flex: 1,
  },
  activityContainer: {
    marginBottom: 8,
  },
  activityLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 4,
  },
  activityText: {
    fontSize: 14,
    color: colors.text,
  },
  lastSeenContainer: {
    marginBottom: 0,
  },
  lastSeenLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 4,
  },
  lastSeenText: {
    fontSize: 14,
    color: colors.text,
  },
});
